import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedcarouselService } from './breedcarousel.service';
import { CreateBreedcarouselDto } from './dto/create-breedcarousel.dto';
import { UpdateBreedcarouselDto } from './dto/update-breedcarousel.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Breedcarousel } from './entities/breedcarousel.entity';

@ApiTags('breed-carousel')
@ApiBearerAuth()
@Controller('breedcarousel')
export class BreedcarouselController {
  constructor(private readonly breedcarouselService: BreedcarouselService) {}

  @Post(':breedId')
  @ApiOperation({ summary: 'Create a new carousel image for a breed' })
  @ApiParam({ name: 'breedId', description: 'Breed ID' })
  @ApiResponse({ status: 201, description: 'Carousel image successfully created', type: Breedcarousel })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Param('breedId') breedId: string,
    @Body() createBreedcarouselDto: CreateBreedcarouselDto
  ) {
    return this.breedcarouselService.create(breedId, createBreedcarouselDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carousel images' })
  @ApiResponse({ status: 200, description: 'List of carousel images retrieved successfully', type: [Breedcarousel] })
  findAll() {
    return this.breedcarouselService.findAll();
  }

  @Get('breed/:breedId')
  @ApiOperation({ summary: 'Get all carousel images for a specific breed' })
  @ApiParam({ name: 'breedId', description: 'Breed ID' })
  @ApiResponse({ status: 200, description: 'List of carousel images retrieved successfully', type: [Breedcarousel] })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  findAllByBreed(@Param('breedId') breedId: string) {
    return this.breedcarouselService.findAllByBreed(breedId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a carousel image by ID' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image found successfully', type: Breedcarousel })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  findOne(@Param('id') id: string) {
    return this.breedcarouselService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a carousel image' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image updated successfully', type: Breedcarousel })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateBreedcarouselDto: UpdateBreedcarouselDto) {
    return this.breedcarouselService.update(id, updateBreedcarouselDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a carousel image' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image successfully deleted' })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.breedcarouselService.remove(id);
  }
}
