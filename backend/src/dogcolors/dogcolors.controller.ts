import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogcolorsService } from './dogcolors.service';
import { CreateDogcolorDto } from './dto/create-dogcolor.dto';
import { UpdateDogcolorDto } from './dto/update-dogcolor.dto';

@Controller('dogcolors')
export class DogcolorsController {
  constructor(private readonly dogcolorsService: DogcolorsService) {}

  @Post()
  create(@Body() createDogcolorDto: CreateDogcolorDto) {
    return this.dogcolorsService.create(createDogcolorDto);
  }

  @Get()
  findAll() {
    return this.dogcolorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogcolorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogcolorDto: UpdateDogcolorDto) {
    return this.dogcolorsService.update(id, updateDogcolorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogcolorsService.remove(id);
  }
}
