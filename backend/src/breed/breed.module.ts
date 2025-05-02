import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { Breed } from './entities/breed.entity';
import { BreedcarouselModule } from '../breedcarousel/breedcarousel.module';
import { Breedcarousel } from '../breedcarousel/entities/breedcarousel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Breed, Breedcarousel]),
    forwardRef(() => BreedcarouselModule),
  ],
  controllers: [BreedController],
  providers: [BreedService],
  exports: [BreedService],
})
export class BreedModule {}
