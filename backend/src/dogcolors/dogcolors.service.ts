import { Injectable } from '@nestjs/common';
import { CreateDogcolorDto } from './dto/create-dogcolor.dto';
import { UpdateDogcolorDto } from './dto/update-dogcolor.dto';

@Injectable()
export class DogcolorsService {
  create(createDogcolorDto: CreateDogcolorDto) {
    return 'This action adds a new dogcolor';
  }

  findAll() {
    return `This action returns all dogcolors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dogcolor`;
  }

  update(id: number, updateDogcolorDto: UpdateDogcolorDto) {
    return `This action updates a #${id} dogcolor`;
  }

  remove(id: number) {
    return `This action removes a #${id} dogcolor`;
  }
}
