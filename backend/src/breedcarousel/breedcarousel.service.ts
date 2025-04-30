import { Injectable } from '@nestjs/common';
import { CreateBreedcarouselDto } from './dto/create-breedcarousel.dto';
import { UpdateBreedcarouselDto } from './dto/update-breedcarousel.dto';

@Injectable()
export class BreedcarouselService {
  create(createBreedcarouselDto: CreateBreedcarouselDto) {
    return 'This action adds a new breedcarousel';
  }

  findAll() {
    return `This action returns all breedcarousel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} breedcarousel`;
  }

  update(id: number, updateBreedcarouselDto: UpdateBreedcarouselDto) {
    return `This action updates a #${id} breedcarousel`;
  }

  remove(id: number) {
    return `This action removes a #${id} breedcarousel`;
  }
}
