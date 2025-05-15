import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductcategoryDto } from './dto/create-productcategory.dto';
import { UpdateProductcategoryDto } from './dto/update-productcategory.dto';
import { Productcategory } from './entities/productcategory.entity';

@Injectable()
export class ProductcategoryService {
  constructor(
    @InjectRepository(Productcategory)
    private productcategoryRepository: Repository<Productcategory>,
  ) {}

  async create(createProductcategoryDto: CreateProductcategoryDto): Promise<Productcategory> {
    try {
      // Check if category with the same name already exists
      const existingCategory = await this.productcategoryRepository.findOne({
        where: { name: createProductcategoryDto.name }
      });

      if (existingCategory) {
        throw new ConflictException(`A category with the name "${createProductcategoryDto.name}" already exists`);
      }

      // Create and save the new product category
      const category = this.productcategoryRepository.create(createProductcategoryDto);
      return await this.productcategoryRepository.save(category);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create product category: ${error.message}`);
    }
  }

  async findAll(): Promise<Productcategory[]> {
    try {
      return await this.productcategoryRepository.find({
        order: { name: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch product categories: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Productcategory> {
    try {
      const category = await this.productcategoryRepository.findOne({
        where: { id }
      });

      if (!category) {
        throw new NotFoundException(`Product category with ID ${id} not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch product category: ${error.message}`);
    }
  }

  async update(id: string, updateProductcategoryDto: UpdateProductcategoryDto): Promise<Productcategory> {
    try {
      const category = await this.findOne(id);
      
      // Check for name uniqueness if name is being updated
      if (updateProductcategoryDto.name && updateProductcategoryDto.name !== category.name) {
        const existingCategory = await this.productcategoryRepository.findOne({
          where: { name: updateProductcategoryDto.name }
        });

        if (existingCategory) {
          throw new ConflictException(`A category with the name "${updateProductcategoryDto.name}" already exists`);
        }
      }

      // Update category properties
      Object.assign(category, updateProductcategoryDto);
      
      return await this.productcategoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update product category: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const category = await this.productcategoryRepository.findOne({
        where: { id },
        relations: ['products']
      });
      
      if (!category) {
        throw new NotFoundException(`Product category with ID ${id} not found`);
      }
      
      // Check if this category is used by any products
      if (category.products && category.products.length > 0) {
        throw new BadRequestException(
          `Cannot delete category "${category.name}" because it is used by ${category.products.length} products. Reassign these products to another category first.`
        );
      }
      
      await this.productcategoryRepository.remove(category);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete product category: ${error.message}`);
    }
  }
}
