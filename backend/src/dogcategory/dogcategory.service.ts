import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDogcategoryDto } from './dto/create-dogcategory.dto';
import { UpdateDogcategoryDto } from './dto/update-dogcategory.dto';
import { Dogcategory } from './entities/dogcategory.entity';

@Injectable()
export class DogcategoryService {
  constructor(
    @InjectRepository(Dogcategory)
    private dogcategoryRepository: Repository<Dogcategory>,
  ) {}

  async create(createDogcategoryDto: CreateDogcategoryDto): Promise<Dogcategory> {
    try {
      // Check if a category with the same name already exists
      const existingCategory = await this.dogcategoryRepository.findOne({
        where: { name: createDogcategoryDto.name }
      });

      if (existingCategory) {
        throw new BadRequestException(`A category with the name "${createDogcategoryDto.name}" already exists`);
      }

      // Create and save the new category
      const newCategory = this.dogcategoryRepository.create(createDogcategoryDto);
      return await this.dogcategoryRepository.save(newCategory);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create category: ${error.message}`);
    }
  }

  async findAll(): Promise<Dogcategory[]> {
    try {
      return await this.dogcategoryRepository.find({
        order: { name: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch categories: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Dogcategory> {
    try {
      const category = await this.dogcategoryRepository.findOne({
        where: { id },
        relations: ['dogs']
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch category: ${error.message}`);
    }
  }

  async update(id: string, updateDogcategoryDto: UpdateDogcategoryDto): Promise<Dogcategory> {
    try {
      const category = await this.findOne(id);

      // Check for name uniqueness if name is being updated
      if (updateDogcategoryDto.name && updateDogcategoryDto.name !== category.name) {
        const existingCategory = await this.dogcategoryRepository.findOne({
          where: { name: updateDogcategoryDto.name }
        });

        if (existingCategory) {
          throw new BadRequestException(`A category with the name "${updateDogcategoryDto.name}" already exists`);
        }
      }

      // Update category properties
      Object.assign(category, updateDogcategoryDto);
      
      return await this.dogcategoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update category: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const category = await this.findOne(id);
      
      if (category.dogs && category.dogs.length > 0) {
        throw new BadRequestException(
          `Cannot delete category "${category.name}" because it is assigned to ${category.dogs.length} dogs. Remove the category from all dogs first.`
        );
      }
      
      await this.dogcategoryRepository.remove(category);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete category: ${error.message}`);
    }
  }
}
