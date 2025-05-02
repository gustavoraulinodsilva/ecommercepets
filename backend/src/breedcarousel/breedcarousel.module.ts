import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedcarouselService } from './breedcarousel.service';
import { BreedcarouselController } from './breedcarousel.controller';
import { Breedcarousel } from './entities/breedcarousel.entity';
import { Breed } from '../breed/entities/breed.entity';
import { BreedModule } from '../breed/breed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Breedcarousel, Breed]), // Add Breed here
    forwardRef(() => BreedModule),
  ],
  controllers: [BreedcarouselController],
  providers: [BreedcarouselService],
  exports: [BreedcarouselService], // Add this to export the service
})
export class BreedcarouselModule {}
