import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedadoptionController } from './breedadoption.controller';
import { BreedadoptionService } from './breedadoption.service';
import { Breedadoption } from './entities/breedadoption.entity';
import { Breed } from '../breed/entities/breed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Breedadoption, Breed])
  ],
  controllers: [BreedadoptionController],
  providers: [BreedadoptionService],
})
export class BreedadoptionModule {}
