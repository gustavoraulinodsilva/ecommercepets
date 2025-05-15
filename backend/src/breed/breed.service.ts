import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breedcarousel } from '../breedcarousel/entities/breedcarousel.entity';
import { Breedadoption } from '../breedadoption/entities/breedadoption.entity';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed) private breedRepository: Repository<Breed>,
    @InjectRepository(Breedcarousel) private breedcarouselRepository: Repository<Breedcarousel>,
    @InjectRepository(Breedadoption) private breedadoptionRepository: Repository<Breedadoption>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    try {
      // Validate input
      if (!createBreedDto.name || createBreedDto.name.trim() === '') {
        throw new BadRequestException('Breed name is required');
      }

      // Create the breed entity
      const breed = this.breedRepository.create({
        name: createBreedDto.name.trim(),
      });
      
      // Save the breed first to get its ID
      const savedBreed = await this.breedRepository.save(breed);
      
      // Create carousel items if they exist in the DTO
      if (createBreedDto.breedcarousel && createBreedDto.breedcarousel.length > 0) {
        const carouselItems = createBreedDto.breedcarousel.map(item => {
          if (!item.url || !item.alt || !item.order) {
            throw new BadRequestException('Carousel items must have url, alt, and order');
          }
          
          return this.breedcarouselRepository.create({
            url: item.url.trim(),
            alt: item.alt.trim(),
            order: item.order,
            breed: savedBreed,
          });
        });
        
        // Save all carousel items
        await this.breedcarouselRepository.save(carouselItems);
      }
      
      // Create adoption items if they exist in the DTO
      if (createBreedDto.breedadoption && createBreedDto.breedadoption.length > 0) {
        const adoptionItems = createBreedDto.breedadoption.map(item => {
          if (!item.url || !item.alt || !item.order) {
            throw new BadRequestException('Adoption items must have url, alt, and order');
          }
          
          return this.breedadoptionRepository.create({
            url: item.url.trim(),
            alt: item.alt.trim(),
            order: item.order,
            breed: savedBreed,
          });
        });
        
        // Save all adoption items
        await this.breedadoptionRepository.save(adoptionItems);
      }
      
      // Return the breed with related items
      return this.findOne(String(savedBreed.id));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create breed: ${error.message}`);
    }
  }

  async findAll(): Promise<Breed[]> {
    try {
      return this.breedRepository.find({
        relations: ['breedcarousel', 'breedadoption'],
        order: {
          name: 'ASC',
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch breeds: ${error.message}`);
    }
  }

  async findOne(id: string | number): Promise<Breed> {
    try {
      const breed = await this.breedRepository.findOne({
        where: { id: Equal(id) },
        relations: ['breedcarousel', 'breedadoption'],
      });
      
      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }
      
      return breed;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch breed: ${error.message}`);
    }
  }

  async update(id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    try {
      const breed = await this.findOne(id);
      
      // Update basic breed properties
      if (updateBreedDto.name) {
        if (updateBreedDto.name.trim() === '') {
          throw new BadRequestException('Breed name cannot be empty');
        }
        breed.name = updateBreedDto.name.trim();
      }
      
      await this.breedRepository.save(breed);
      
      // Handle carousel items if included
      if (updateBreedDto.breedcarousel !== undefined) {
        // Remove existing carousel items
        if (breed.breedcarousel && breed.breedcarousel.length > 0) {
          await this.breedcarouselRepository.remove(breed.breedcarousel);
        }
        
        // Create new carousel items if array is not empty
        if (updateBreedDto.breedcarousel.length > 0) {
          const carouselItems = updateBreedDto.breedcarousel.map(item => {
            if (!item.url || !item.alt || !item.order) {
              throw new BadRequestException('Carousel items must have url, alt, and order');
            }
            
            return this.breedcarouselRepository.create({
              url: item.url.trim(),
              alt: item.alt.trim(),
              order: item.order,
              breed,
            });
          });
          
          await this.breedcarouselRepository.save(carouselItems);
        }
      }
      
      // Handle adoption items if included
      if (updateBreedDto.breedadoption !== undefined) {
        // Remove existing adoption items
        if (breed.breedadoption && breed.breedadoption.length > 0) {
          await this.breedadoptionRepository.remove(breed.breedadoption);
        }
        
        // Create new adoption items if array is not empty
        if (updateBreedDto.breedadoption.length > 0) {
          const adoptionItems = updateBreedDto.breedadoption.map(item => {
            if (!item.url || !item.alt || !item.order) {
              throw new BadRequestException('Adoption items must have url, alt, and order');
            }
            
            return this.breedadoptionRepository.create({
              url: item.url.trim(),
              alt: item.alt.trim(),
              order: item.order,
              breed,
            });
          });
          
          await this.breedadoptionRepository.save(adoptionItems);
        }
      }
      
      // Return updated breed with relations
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update breed: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const breed = await this.findOne(id);
      
      // The cascade option in the entity will handle deletion of related items
      await this.breedRepository.remove(breed);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete breed: ${error.message}`);
    }
  }
}
