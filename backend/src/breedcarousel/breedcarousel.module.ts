import { Module } from '@nestjs/common';
import { BreedcarouselService } from './breedcarousel.service';
import { BreedcarouselController } from './breedcarousel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breedcarousel } from './entities/breedcarousel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Breedcarousel
    ]),
  ],
  controllers: [BreedcarouselController],
  providers: [BreedcarouselService],
})
export class BreedcarouselModule {}
