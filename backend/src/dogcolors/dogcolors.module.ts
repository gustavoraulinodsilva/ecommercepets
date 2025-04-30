import { Module } from '@nestjs/common';
import { DogcolorsService } from './dogcolors.service';
import { DogcolorsController } from './dogcolors.controller';
import { Dogcolor } from './entities/dogcolor.entity';

@Module({
  imports: [
    Dogcolor,
  ],
  controllers: [DogcolorsController],
  providers: [DogcolorsService],
})
export class DogcolorsModule {}
