import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Breedadoption } from './entities/breedadoption.entity';
import { CreateBreedadoptionDto } from './dto/create-breedadoption.dto';
import { UpdateBreedadoptionDto } from './dto/update-breedadoption.dto';
import { Breed } from '../breed/entities/breed.entity';

@Injectable()
export class BreedadoptionService {
  constructor(
    @InjectRepository(Breedadoption)
    private breedadoptionRepository: Repository<Breedadoption>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(breedId: string, createBreedadoptionDto: CreateBreedadoptionDto): Promise<Breedadoption> {
    // Verify breed exists
    const breed = await this.breedRepository.findOne({ where: { id: Equal(breedId) } });
    if (!breed) {
      throw new BadRequestException(`Breed with ID ${breedId} not found`);
    }
    
    // Create adoption item
    const adoptionItem = this.breedadoptionRepository.create({
      ...createBreedadoptionDto,
      breed,
    });
    
    return this.breedadoptionRepository.save(adoptionItem);
  }

  async findAll(): Promise<Breedadoption[]> {
    return this.breedadoptionRepository.find({
      relations: ['breed'],
    });
  }

  async findAllByBreed(breedId: string): Promise<Breedadoption[]> {
    return this.breedadoptionRepository.find({
      where: { breed: { id: Equal(breedId) } },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Breedadoption> {
    const adoptionItem = await this.breedadoptionRepository.findOne({
      where: { id },
      relations: ['breed'],
    });
    
    if (!adoptionItem) {
      throw new NotFoundException(`Adoption item with ID ${id} not found`);
    }
    
    return adoptionItem;
  }

  async update(id: string, updateBreedadoptionDto: UpdateBreedadoptionDto): Promise<Breedadoption> {
    const adoptionItem = await this.findOne(id);
    
    // Update properties
    Object.assign(adoptionItem, updateBreedadoptionDto);
    
    return this.breedadoptionRepository.save(adoptionItem);
  }

  async remove(id: string): Promise<void> {
    const adoptionItem = await this.findOne(id);
    await this.breedadoptionRepository.remove(adoptionItem);
  }
}
