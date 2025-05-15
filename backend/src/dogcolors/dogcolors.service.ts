import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogcolorDto } from './dto/create-dogcolor.dto';
import { UpdateDogcolorDto } from './dto/update-dogcolor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dogcolor } from './entities/dogcolor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogcolorsService {

  constructor(
    @InjectRepository(Dogcolor)
    private dogcolorRepository: Repository<Dogcolor>,
  ) {}
  
  create(createDogcolorDto: CreateDogcolorDto): Promise<Dogcolor> {
    const newDogcolor = this.dogcolorRepository.create(createDogcolorDto);
    return this.dogcolorRepository.save(newDogcolor);
  }

  findAll(): Promise<Dogcolor[]> {
    return this.dogcolorRepository.find();
  }

  async findOne(id: string): Promise<Dogcolor> {
    const dogcolor = await this.dogcolorRepository.findOneBy({ id });
    if (!dogcolor) {
      throw new NotFoundException(`Dogcolor with ID ${id} not found`);
    }
    return dogcolor;
  }

  async update(id: string, updateDogcolorDto: UpdateDogcolorDto): Promise<Dogcolor> {
    const dogcolor = await this.dogcolorRepository.findOneBy({ id });
    if (!dogcolor) {
      throw new NotFoundException(`Dogcolor with ID ${id} not found`);
    }
    const updatedDogcolor = Object.assign(dogcolor, updateDogcolorDto);
    await this.dogcolorRepository.update(id, updatedDogcolor);
    return updatedDogcolor;
  }

  remove(id: string): Promise<void> {
    const dogcolor = this.dogcolorRepository.findOneBy({ id });
    if (!dogcolor) {
      throw new NotFoundException(`Dogcolor with ID ${id} not found`);
    }
    return this.dogcolorRepository.delete(id).then(() => {});
  }
}
