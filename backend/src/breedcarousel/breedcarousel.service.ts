import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breedcarousel } from './entities/breedcarousel.entity';
import { CreateBreedcarouselDto } from './dto/create-breedcarousel.dto';
import { UpdateBreedcarouselDto } from './dto/update-breedcarousel.dto';
import { Breed } from '../breed/entities/breed.entity';

@Injectable()
export class BreedcarouselService {
  constructor(
    @InjectRepository(Breedcarousel)
    private breedcarouselRepository: Repository<Breedcarousel>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(breedId: string, createBreedcarouselDto: CreateBreedcarouselDto): Promise<Breedcarousel> {
    // Verify breed exists
    const breed = await this.breedRepository.findOne({ where: { id: breedId as any } });
    if (!breed) {
      throw new BadRequestException(`Breed with ID ${breedId} not found`);
    }
    
    // Create carousel item
    const carouselItem = this.breedcarouselRepository.create({
      ...createBreedcarouselDto,
      breed,
    });
    
    return this.breedcarouselRepository.save(carouselItem);
  }

  async findAll(): Promise<Breedcarousel[]> {
    return this.breedcarouselRepository.find({
      relations: ['breed'],
    });
  }

  async findAllByBreed(breedId: string): Promise<Breedcarousel[]> {
    return this.breedcarouselRepository.find({
      where: { breed: { id: breedId } as any },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Breedcarousel> {
    const carouselItem = await this.breedcarouselRepository.findOne({
      where: { id },
      relations: ['breed'],
    });
    
    if (!carouselItem) {
      throw new NotFoundException(`Carousel item with ID ${id} not found`);
    }
    
    return carouselItem;
  }

  async update(id: string, updateBreedcarouselDto: UpdateBreedcarouselDto): Promise<Breedcarousel> {
    const carouselItem = await this.findOne(id);
    
    // Update properties
    Object.assign(carouselItem, updateBreedcarouselDto);
    
    return this.breedcarouselRepository.save(carouselItem);
  }

  async remove(id: string): Promise<void> {
    const carouselItem = await this.findOne(id);
    await this.breedcarouselRepository.remove(carouselItem);
  }
}
