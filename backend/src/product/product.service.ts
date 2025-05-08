import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Productcategory } from 'src/productcategory/entities/productcategory.entity';
import { Productcarousel } from 'src/productcarousel/entities/productcarousel.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Productcategory)
    private categoryRepository: Repository<Productcategory>,
    @InjectRepository(Productcarousel)
    private carouselRepository: Repository<Productcarousel>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      // Check for duplicate SKU
      const existingProduct = await this.productRepository.findOne({
        where: { sku: createProductDto.sku }
      });

      if (existingProduct) {
        throw new ConflictException(`Product with SKU ${createProductDto.sku} already exists`);
      }

      // Find the category
      const category = await this.categoryRepository.findOne({
        where: { id: createProductDto.categoryId }
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
      }

      // Create the product without carousel items initially
      const product = this.productRepository.create({
        sku: createProductDto.sku,
        name: createProductDto.name,
        category: category,
        price: createProductDto.price,
        stock: createProductDto.stock,
        size: createProductDto.size,
        description: createProductDto.description
      });

      // Save the product first to get an ID
      const savedProduct = await this.productRepository.save(product);

      // If carousel items are provided, create them
      if (createProductDto.productCarousels && createProductDto.productCarousels.length > 0) {
        await this.addCarouselImages(savedProduct.id, createProductDto.productCarousels);
      }

      // Return the product with all relations
      return this.findOne(savedProduct.id);
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create product: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        relations: ['category', 'productCarousels'],
        order: { name: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch products: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['category', 'productCarousels']
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch product: ${error.message}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      // Check if product exists
      const product = await this.findOne(id);

      // If SKU is being updated, check for duplicates
      if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
        const existingSku = await this.productRepository.findOne({
          where: { sku: updateProductDto.sku }
        });

        if (existingSku) {
          throw new ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
        }
      }

      // If category is being updated, find the new category
      let category = product.category;
      if (updateProductDto.categoryId) {
        const foundCategory = await this.categoryRepository.findOne({
          where: { id: updateProductDto.categoryId }
        });

        if (!foundCategory) {
          throw new NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
        }
        
        category = foundCategory;
      }
      
      // Update basic product properties
      Object.assign(product, {
        sku: updateProductDto.sku !== undefined ? updateProductDto.sku : product.sku,
        name: updateProductDto.name !== undefined ? updateProductDto.name : product.name,
        price: updateProductDto.price !== undefined ? updateProductDto.price : product.price,
        stock: updateProductDto.stock !== undefined ? updateProductDto.stock : product.stock,
        size: updateProductDto.size !== undefined ? updateProductDto.size : product.size,
        description: updateProductDto.description !== undefined ? updateProductDto.description : product.description,
        category: category
      });

      // Save updated product
      await this.productRepository.save(product);

      // Update carousel items if provided
      if (updateProductDto.productCarousels && updateProductDto.productCarousels.length > 0) {
        await this.updateCarouselImages(id, updateProductDto.productCarousels);
      }

      // Return updated product with relations
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update product: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const product = await this.findOne(id);
      await this.productRepository.remove(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete product: ${error.message}`);
    }
  }

  // Dedicated carousel management methods
  
  async getCarouselImages(productId: string): Promise<Productcarousel[]> {
    try {
      // First check if product exists
      await this.findOne(productId);
      
      return await this.carouselRepository.find({
        where: { product: { id: productId } },
        order: { order: 'ASC' }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch carousel images: ${error.message}`);
    }
  }
  
  async addCarouselImages(productId: string, carouselItems: any[]): Promise<Productcarousel[]> {
    try {
      // First check if product exists
      await this.findOne(productId);
      
      const items = carouselItems.map(item => 
        this.carouselRepository.create({
          url: item.url,
          alt: item.alt,
          order: item.order,
          product: { id: productId }
        })
      );
      
      return await this.carouselRepository.save(items);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to add carousel images: ${error.message}`);
    }
  }
  
  async updateCarouselImages(productId: string, carouselItems: any[]): Promise<Productcarousel[]> {
    try {
      // First check if product exists
      await this.findOne(productId);
      
      // Get existing carousel items
      const existingItems = await this.carouselRepository.find({
        where: { product: { id: productId } }
      });
      
      // Process each carousel item
      const updatedItems: Productcarousel[] = [];
      
      for (const item of carouselItems) {
        // If item has an ID, it's an update
        if (item.id) {
          const existingItem = existingItems.find(e => e.id === item.id);
          if (existingItem) {
            Object.assign(existingItem, {
              url: item.url !== undefined ? item.url : existingItem.url,
              alt: item.alt !== undefined ? item.alt : existingItem.alt,
              order: item.order !== undefined ? item.order : existingItem.order
            });
            updatedItems.push(await this.carouselRepository.save(existingItem));
          }
        } else {
          // New item
          const newItem = this.carouselRepository.create({
            url: item.url,
            alt: item.alt,
            order: item.order,
            product: { id: productId }
          });
          updatedItems.push(await this.carouselRepository.save(newItem));
        }
      }
      
      return updatedItems;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update carousel images: ${error.message}`);
    }
  }
  
  async deleteCarouselImage(carouselId: string): Promise<void> {
    try {
      const carouselItem = await this.carouselRepository.findOne({
        where: { id: carouselId },
        relations: ['product']
      });
      
      if (!carouselItem) {
        throw new NotFoundException(`Carousel image with ID ${carouselId} not found`);
      }
      
      await this.carouselRepository.remove(carouselItem);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete carousel image: ${error.message}`);
    }
  }
  
  async reorderCarouselImages(productId: string, orderData: {id: string, order: number}[]): Promise<Productcarousel[]> {
    try {
      // First check if product exists
      await this.findOne(productId);
      
      // Get existing carousel items
      const existingItems = await this.carouselRepository.find({
        where: { product: { id: productId } }
      });
      
      // Update order for each item
      const updates = orderData.map(async item => {
        const carouselItem = existingItems.find(c => c.id === item.id);
        if (!carouselItem) {
          throw new NotFoundException(`Carousel item with ID ${item.id} not found`);
        }
        
        carouselItem.order = item.order;
        return this.carouselRepository.save(carouselItem);
      });
      
      await Promise.all(updates);
      
      // Return ordered items
      return this.getCarouselImages(productId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to reorder carousel images: ${error.message}`);
    }
  }
}
