import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogcolorsService } from './dogcolors.service';
import { CreateDogcolorDto } from './dto/create-dogcolor.dto';
import { UpdateDogcolorDto } from './dto/update-dogcolor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Dogcolor } from './entities/dogcolor.entity';

@ApiTags('dog-colors')
@ApiBearerAuth()
@Controller('dogcolors')
export class DogcolorsController {
  constructor(private readonly dogcolorsService: DogcolorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dog color' })
  @ApiResponse({ status: 201, description: 'Color successfully created', type: Dogcolor })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createDogcolorDto: CreateDogcolorDto) {
    return this.dogcolorsService.create(createDogcolorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dog colors' })
  @ApiResponse({ status: 200, description: 'List of dog colors retrieved successfully', type: [Dogcolor] })
  findAll() {
    return this.dogcolorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dog color by ID' })
  @ApiParam({ name: 'id', description: 'Dog color ID' })
  @ApiResponse({ status: 200, description: 'Dog color found successfully', type: Dogcolor })
  @ApiResponse({ status: 404, description: 'Dog color not found' })
  findOne(@Param('id') id: string) {
    return this.dogcolorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dog color' })
  @ApiParam({ name: 'id', description: 'Dog color ID' })
  @ApiResponse({ status: 200, description: 'Dog color updated successfully', type: Dogcolor })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Dog color not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateDogcolorDto: UpdateDogcolorDto) {
    return this.dogcolorsService.update(id, updateDogcolorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dog color' })
  @ApiParam({ name: 'id', description: 'Dog color ID' })
  @ApiResponse({ status: 200, description: 'Dog color successfully deleted' })
  @ApiResponse({ status: 404, description: 'Dog color not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.dogcolorsService.remove(id);
  }
}
