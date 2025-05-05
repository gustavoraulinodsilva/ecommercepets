import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedadoptionService } from './breedadoption.service';
import { CreateBreedadoptionDto } from './dto/create-breedadoption.dto';
import { UpdateBreedadoptionDto } from './dto/update-breedadoption.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Breedadoption } from './entities/breedadoption.entity';

@ApiTags('breed-adoption')
@ApiBearerAuth()
@Controller('breedadoption')
export class BreedadoptionController {
  constructor(private readonly breedadoptionService: BreedadoptionService) {}

  @Post('breed/:breedId')
  @ApiOperation({ summary: 'Create a new breed adoption image' })
  @ApiParam({ name: 'breedId', description: 'Breed ID' })
  @ApiResponse({ status: 201, description: 'Breed adoption image successfully created', type: Breedadoption })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  create(@Param('breedId') breedId: string, @Body() createBreedadoptionDto: CreateBreedadoptionDto) {
    return this.breedadoptionService.create(breedId, createBreedadoptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all breed adoption images' })
  @ApiResponse({ status: 200, description: 'List of breed adoption images retrieved successfully', type: [Breedadoption] })
  findAll() {
    return this.breedadoptionService.findAll();
  }

  @Get('breed/:breedId')
  @ApiOperation({ summary: 'Get all adoption images for a specific breed' })
  @ApiParam({ name: 'breedId', description: 'Breed ID' })
  @ApiResponse({ status: 200, description: 'List of breed adoption images retrieved successfully', type: [Breedadoption] })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  findAllByBreed(@Param('breedId') breedId: string) {
    return this.breedadoptionService.findAllByBreed(breedId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a breed adoption image by ID' })
  @ApiParam({ name: 'id', description: 'Breed adoption image ID' })
  @ApiResponse({ status: 200, description: 'Breed adoption image found successfully', type: Breedadoption })
  @ApiResponse({ status: 404, description: 'Breed adoption image not found' })
  findOne(@Param('id') id: string) {
    return this.breedadoptionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a breed adoption image' })
  @ApiParam({ name: 'id', description: 'Breed adoption image ID' })
  @ApiResponse({ status: 200, description: 'Breed adoption image updated successfully', type: Breedadoption })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Breed adoption image not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateBreedadoptionDto: UpdateBreedadoptionDto) {
    return this.breedadoptionService.update(id, updateBreedadoptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a breed adoption image' })
  @ApiParam({ name: 'id', description: 'Breed adoption image ID' })
  @ApiResponse({ status: 200, description: 'Breed adoption image successfully deleted' })
  @ApiResponse({ status: 404, description: 'Breed adoption image not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.breedadoptionService.remove(id);
  }
}
