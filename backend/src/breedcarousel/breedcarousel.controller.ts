import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedcarouselService } from './breedcarousel.service';
import { CreateBreedcarouselDto } from './dto/create-breedcarousel.dto';
import { UpdateBreedcarouselDto } from './dto/update-breedcarousel.dto';

@Controller('breedcarousel')
export class BreedcarouselController {
  constructor(private readonly breedcarouselService: BreedcarouselService) {}

  @Post()
  create(@Body() createBreedcarouselDto: CreateBreedcarouselDto) {
    return this.breedcarouselService.create(createBreedcarouselDto);
  }

  @Get()
  findAll() {
    return this.breedcarouselService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedcarouselService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedcarouselDto: UpdateBreedcarouselDto) {
    return this.breedcarouselService.update(+id, updateBreedcarouselDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedcarouselService.remove(+id);
  }
}
