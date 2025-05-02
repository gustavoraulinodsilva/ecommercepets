import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Dog } from './entities/dog.entity';

@ApiTags('dogs')
@ApiBearerAuth()
@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dog' })
  @ApiResponse({ status: 201, description: 'Dog successfully created', type: Dog })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dogs' })
  @ApiResponse({ status: 200, description: 'List of dogs retrieved successfully', type: [Dog] })
  findAll() {
    return this.dogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dog by ID' })
  @ApiParam({ name: 'id', description: 'Dog ID' })
  @ApiResponse({ status: 200, description: 'Dog found successfully', type: Dog })
  @ApiResponse({ status: 404, description: 'Dog not found' })
  findOne(@Param('id') id: string) {
    return this.dogService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dog' })
  @ApiParam({ name: 'id', description: 'Dog ID' })
  @ApiResponse({ status: 200, description: 'Dog updated successfully', type: Dog })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Dog not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogService.update(id, updateDogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dog' })
  @ApiParam({ name: 'id', description: 'Dog ID' })
  @ApiResponse({ status: 200, description: 'Dog successfully deleted' })
  @ApiResponse({ status: 404, description: 'Dog not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.dogService.remove(id);
  }
}