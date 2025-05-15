import { Module } from '@nestjs/common';
import { DogcategoryService } from './dogcategory.service';
import { DogcategoryController } from './dogcategory.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dogcategory } from './entities/dogcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dogcategory]),
  ],
  controllers: [DogcategoryController],
  providers: [DogcategoryService],
  exports: [DogcategoryService],
})
export class DogcategoryModule {}
