import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productcarousel } from './entities/productcarousel.entity';
import { CreateProductcarouselDto } from './dto/create-productcarousel.dto';
import { UpdateProductcarouselDto } from './dto/update-productcarousel.dto';

@Injectable()
export class ProductcarouselService {
  constructor(
    @InjectRepository(Productcarousel)
    private productcarouselRepository: Repository<Productcarousel>,
  ) {}

  async create(createProductcarouselDto: CreateProductcarouselDto, productId: string): Promise<Productcarousel> {
    try {
      const carousel = this.productcarouselRepository.create({
        ...createProductcarouselDto,
        product: { id: productId }
      });
      
      return await this.productcarouselRepository.save(carousel);
    } catch (error) {
      throw new BadRequestException(`Failed to create carousel image: ${error.message}`);
    }
  }

  async findAll(): Promise<Productcarousel[]> {
    try {
      return await this.productcarouselRepository.find({
        relations: ['product'],
        order: { order: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch carousel images: ${error.message}`);
    }
  }

  async findByProductId(productId: string): Promise<Productcarousel[]> {
    try {
      return await this.productcarouselRepository.find({
        where: { product: { id: productId } },
        order: { order: 'ASC' }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch carousel images for product: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Productcarousel> {
    try {
      const carousel = await this.productcarouselRepository.findOne({
        where: { id },
        relations: ['product']
      });

      if (!carousel) {
        throw new NotFoundException(`Carousel image with ID ${id} not found`);
      }

      return carousel;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch carousel image: ${error.message}`);
    }
  }

  async update(id: string, updateProductcarouselDto: UpdateProductcarouselDto): Promise<Productcarousel> {
    try {
      const carousel = await this.findOne(id);
      
      Object.assign(carousel, updateProductcarouselDto);
      
      return await this.productcarouselRepository.save(carousel);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update carousel image: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const carousel = await this.findOne(id);
      await this.productcarouselRepository.remove(carousel);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete carousel image: ${error.message}`);
    }
  }

  async reorderCarouselItems(productId: string, itemOrders: {id: string, order: number}[]): Promise<Productcarousel[]> {
    try {
      const carouselItems = await this.findByProductId(productId);
      
      const updates = itemOrders.map(async item => {
        const carouselItem = carouselItems.find(c => c.id === item.id);
        if (!carouselItem) {
          throw new NotFoundException(`Carousel item with ID ${item.id} not found`);
        }
        
        carouselItem.order = item.order;
        return this.productcarouselRepository.save(carouselItem);
      });
      
      return await Promise.all(updates);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to reorder carousel items: ${error.message}`);
    }
  }
}
