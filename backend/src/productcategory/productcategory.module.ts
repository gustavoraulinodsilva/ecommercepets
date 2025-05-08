import { Module } from '@nestjs/common';
import { ProductcategoryService } from './productcategory.service';
import { ProductcategoryController } from './productcategory.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productcategory } from './entities/productcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productcategory])
  ],
  controllers: [ProductcategoryController],
  providers: [ProductcategoryService],
  exports: [ProductcategoryService],
})
export class ProductcategoryModule {}
