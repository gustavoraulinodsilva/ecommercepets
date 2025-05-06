import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Equal } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { Breed } from '../breed/entities/breed.entity';
import { Dogcolor } from '../dogcolors/entities/dogcolor.entity';
import { Dogcategory } from 'src/dogcategory/entities/dogcategory.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
    @InjectRepository(Dogcolor)
    private dogcolorRepository: Repository<Dogcolor>,
    @InjectRepository(Dogcategory)
    private dogcategoryRepository: Repository<Dogcategory>
  ) {}

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    // Find the breed
    const breed = await this.breedRepository.findOne({
      where: { id: Equal(createDogDto.breedId) }
    });

    if (!breed) {
      throw new NotFoundException(`Breed with ID ${createDogDto.breedId} not found`);
    }

    // Find colors by ID
    const colors = await this.dogcolorRepository.findBy({
      id: In(createDogDto.colorIds)
    });

    if (colors.length !== createDogDto.colorIds.length) {
      throw new BadRequestException('One or more colors were not found');
    }

    // Find the category
    const category = await this.dogcategoryRepository.findOne({
      where: { id: Equal(createDogDto.categoryId) }
    });

    if (!category) {
      throw new BadRequestException(`Category with ID ${createDogDto.categoryId} not found`);
    }

    // Create new dog instance with all properties
    const dog = this.dogRepository.create({
      sku: createDogDto.sku,
      price: createDogDto.price,
      gender: createDogDto.gender,
      age: createDogDto.age,
      vaccinated: createDogDto.vaccinated || false,
      dewormed: createDogDto.dewormed || false,
      certified: createDogDto.certified || false,
      microship: createDogDto.microship || false,
      localization: createDogDto.localization,
      publicationDate: createDogDto.publicationDate,
      description: createDogDto.description,
      breed: breed,
      colors: colors,
      category: category // Set a single category
    });

    // Save to database
    return await this.dogRepository.save(dog);
  }

  async findAll(): Promise<Dog[]> {
    return await this.dogRepository.find({
      relations: ['breed', 'breed.breedcarousel', 'breed.breedadoption', 'colors', 'category'],
    });
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogRepository.findOne({
      where: { id: Equal(id) },
      relations: ['breed', 'breed.breedcarousel','breed.breedadoption', 'colors', 'category'],
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

    // Update colors if provided
    if (updateDogDto.colorIds && updateDogDto.colorIds.length > 0) {
      const colors = await this.dogcolorRepository.findBy({
        id: In(updateDogDto.colorIds)
      });

      if (colors.length !== updateDogDto.colorIds.length) {
        throw new BadRequestException('One or more colors were not found');
      }

      dog.colors = colors;
    }

    // Update category if provided - using a single categoryId
    if (updateDogDto.categoryId) {
      const category = await this.dogcategoryRepository.findOne({
        where: { id: Equal(updateDogDto.categoryId) }
      });

      if (!category) {
        throw new BadRequestException(`Category with ID ${updateDogDto.categoryId} not found`);
      }

      dog.category = category;
    }

    // Update other properties
    Object.assign(dog, {
      sku: updateDogDto.sku !== undefined ? updateDogDto.sku : dog.sku,
      price: updateDogDto.price !== undefined ? updateDogDto.price : dog.price,
      gender: updateDogDto.gender !== undefined ? updateDogDto.gender : dog.gender,
      age: updateDogDto.age !== undefined ? updateDogDto.age : dog.age,
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
