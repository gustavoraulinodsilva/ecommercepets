import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedService } from './breed.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Breed } from './entities/breed.entity';

@ApiTags('breeds')
@ApiBearerAuth()
@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dog breed' })
  @ApiResponse({ status: 201, description: 'Breed successfully created', type: Breed })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedService.create(createBreedDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dog breeds' })
  @ApiResponse({ status: 200, description: 'List of dog breeds retrieved successfully', type: [Breed] })
  findAll() {
    return this.breedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dog breed by ID' })
  @ApiParam({ name: 'id', description: 'Breed ID' })
  @ApiResponse({ status: 200, description: 'Breed found successfully', type: Breed })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  findOne(@Param('id') id: string) {
    return this.breedService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dog breed' })
  @ApiParam({ name: 'id', description: 'Breed ID' })
  @ApiResponse({ status: 200, description: 'Breed updated successfully', type: Breed })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedService.update(id, updateBreedDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dog breed' })
  @ApiParam({ name: 'id', description: 'Breed ID' })
  @ApiResponse({ status: 200, description: 'Breed successfully deleted' })
  @ApiResponse({ status: 404, description: 'Breed not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.breedService.remove(id);
  }
}
