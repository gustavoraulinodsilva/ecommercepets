import { Module } from '@nestjs/common';
import { DogcolorsService } from './dogcolors.service';
import { DogcolorsController } from './dogcolors.controller';
import { Dogcolor } from './entities/dogcolor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dogcolor]),
  ],
  controllers: [DogcolorsController],
  providers: [DogcolorsService],
})
export class DogcolorsModule {}
