import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Equal } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { Breed } from '../breed/entities/breed.entity';
import { Dogcolor } from '../dogcolors/entities/dogcolor.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
    @InjectRepository(Dogcolor)
    private dogcolorRepository: Repository<Dogcolor>,
  ) {}

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    // Find the breed
    const breed = await this.breedRepository.findOne({
      where: { id: Equal(createDogDto.breedId) }
    });

    if (!breed) {
      throw new NotFoundException(`Breed with ID ${createDogDto.breedId} not found`);
    }

    // Find colors by ID (not by name)
    const colors = await this.dogcolorRepository.findBy({
      id: In(createDogDto.colorIds) // Look up by ID, not by name
    });

    if (colors.length !== createDogDto.colorIds.length) {
      throw new BadRequestException('One or more colors were not found');
    }

    // Create new dog instance
    const dog = this.dogRepository.create({
      sku: createDogDto.sku,
      price: createDogDto.price,
      gender: createDogDto.gender,
      age: createDogDto.age,
      size: createDogDto.size,
      vaccinated: createDogDto.vaccinated || false,
      dewormed: createDogDto.dewormed || false,
      certified: createDogDto.certified || false,
      microship: createDogDto.microship || false,
      localization: createDogDto.localization,
      publicationDate: createDogDto.publicationDate,
      description: createDogDto.description,
      breed: breed,
      colors: colors
    });

    // Save to database
    return await this.dogRepository.save(dog);
  }

  async findAll(): Promise<Dog[]> {
    return await this.dogRepository.find({
      relations: ['breed','breed.breedcarousel', 'colors']
    });
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogRepository.findOne({
      where: { id: Equal(id) },
      relations: ['breed','breed.breedcarousel' , 'colors']
    });

    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    return dog;
  }

  async update(id: string, updateDogDto: UpdateDogDto): Promise<Dog> {
    // First check if dog exists
    const dog = await this.findOne(id);

    // Update breed if provided
    if (updateDogDto.breedId) {
      const breed = await this.breedRepository.findOne({
        where: { id: Equal(updateDogDto.breedId) }
      });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${updateDogDto.breedId} not found`);
      }

      dog.breed = breed;
    }

    // Update colors if provided - fixing to use colorIds instead of colorNames
    if (updateDogDto.colorIds && updateDogDto.colorIds.length > 0) {
      const colors = await this.dogcolorRepository.findBy({
        id: In(updateDogDto.colorIds) // Look up by ID, not by name
      });

      if (colors.length !== updateDogDto.colorIds.length) {
        throw new BadRequestException('One or more colors were not found');
      }

      dog.colors = colors;
    }

    // Update other properties (no changes needed here)
    Object.assign(dog, {
      sku: updateDogDto.sku !== undefined ? updateDogDto.sku : dog.sku,
      price: updateDogDto.price !== undefined ? updateDogDto.price : dog.price,
      gender: updateDogDto.gender !== undefined ? updateDogDto.gender : dog.gender,
      age: updateDogDto.age !== undefined ? updateDogDto.age : dog.age,
      size: updateDogDto.size !== undefined ? updateDogDto.size : dog.size,
      vaccinated: updateDogDto.vaccinated !== undefined ? updateDogDto.vaccinated : dog.vaccinated,
      dewormed: updateDogDto.dewormed !== undefined ? updateDogDto.dewormed : dog.dewormed,
      certified: updateDogDto.certified !== undefined ? updateDogDto.certified : dog.certified,
      microship: updateDogDto.microship !== undefined ? updateDogDto.microship : dog.microship,
      localization: updateDogDto.localization !== undefined ? updateDogDto.localization : dog.localization,
      publicationDate: updateDogDto.publicationDate !== undefined ? updateDogDto.publicationDate : dog.publicationDate,
      description: updateDogDto.description !== undefined ? updateDogDto.description : dog.description,
    });

    return await this.dogRepository.save(dog);
  }

  async remove(id: string): Promise<void> {
    const dog = await this.findOne(id.toString());
    await this.dogRepository.remove(dog);
  }
}
