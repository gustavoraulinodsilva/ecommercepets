import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Breed } from 'src/breed/entities/breed.entity';
import { Dogcolor } from 'src/dogcolors/entities/dogcolor.entity';
import { Dogcategory } from 'src/dogcategory/entities/dogcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Breed, Dogcolor, Dogcategory])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
