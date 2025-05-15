import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Productcategory } from 'src/productcategory/entities/productcategory.entity';
import { Productcarousel } from 'src/productcarousel/entities/productcarousel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Product, Productcategory, Productcarousel ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
