import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breedcarousel } from '../breedcarousel/entities/breedcarousel.entity';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed) private breedRepository: Repository<Breed>,
    @InjectRepository(Breedcarousel) private breedcarouselRepository: Repository<Breedcarousel>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    // Create the breed entity
    const breed = this.breedRepository.create({
      name: createBreedDto.name,
    });
    
    // Save the breed first to get its ID
    const savedBreed = await this.breedRepository.save(breed);
    
    // Create carousel items if they exist in the DTO
    if (createBreedDto.breedcarousel && createBreedDto.breedcarousel.length > 0) {
      const carouselItems = createBreedDto.breedcarousel.map(item => 
        this.breedcarouselRepository.create({
          ...item,
          breed: savedBreed,
        })
      );
      
      // Save all carousel items
      await this.breedcarouselRepository.save(carouselItems);
    }
    
    // Return the breed with related carousel items
    return this.findOne(String(savedBreed.id));
  }

  async findAll(): Promise<Breed[]> {
    return this.breedRepository.find({
      relations: ['breedcarousel'],
    });
  }

  async findOne(id: string | number): Promise<Breed> {
    const breed = await this.breedRepository.findOne({
      where: { id: Equal(id) },
      relations: ['breedcarousel'],
    });
    
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${id} not found`);
    }
    
    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    const breed = await this.findOne(id);
    
    // Update basic breed properties
    if (updateBreedDto.name) {
      breed.name = updateBreedDto.name;
    }
    
    await this.breedRepository.save(breed);
    
    // Handle carousel items if included
    if (updateBreedDto.breedcarousel) {
      // Remove existing carousel items
      if (breed.breedcarousel && breed.breedcarousel.length > 0) {
        await this.breedcarouselRepository.remove(breed.breedcarousel);
      }
      
      // Create new carousel items
      const carouselItems = updateBreedDto.breedcarousel.map(item => 
        this.breedcarouselRepository.create({
          ...item,
          breed,
        })
      );
      
      await this.breedcarouselRepository.save(carouselItems);
    }
    
    // Return updated breed with relations
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const breed = await this.findOne(id);
    await this.breedRepository.remove(breed);
    // No need to delete carousel items separately due to CASCADE delete
  }
}
