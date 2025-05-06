import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogcategoryService } from './dogcategory.service';
import { CreateDogcategoryDto } from './dto/create-dogcategory.dto';
import { UpdateDogcategoryDto } from './dto/update-dogcategory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Dogcategory } from './entities/dogcategory.entity';

@ApiTags('dog-categories')
@ApiBearerAuth()
@Controller('dogcategory')
export class DogcategoryController {
  constructor(private readonly dogcategoryService: DogcategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dog category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created', type: Dogcategory })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data or duplicate category name' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Authentication required' })
  create(@Body() createDogcategoryDto: CreateDogcategoryDto) {
    return this.dogcategoryService.create(createDogcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dog categories' })
  @ApiResponse({ status: 200, description: 'List of all dog categories', type: [Dogcategory] })
  findAll() {
    return this.dogcategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific dog category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID (UUID format)' })
  @ApiResponse({ status: 200, description: 'The category has been found', type: Dogcategory })
  @ApiResponse({ status: 404, description: 'Category not found' })
  findOne(@Param('id') id: string) {
    return this.dogcategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dog category' })
  @ApiParam({ name: 'id', description: 'Category ID (UUID format)' })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated', type: Dogcategory })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data or duplicate category name' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Authentication required' })
  update(@Param('id') id: string, @Body() updateDogcategoryDto: UpdateDogcategoryDto) {
    return this.dogcategoryService.update(id, updateDogcategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dog category' })
  @ApiParam({ name: 'id', description: 'Category ID (UUID format)' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted' })
  @ApiResponse({ status: 400, description: 'Bad request - Cannot delete category assigned to dogs' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Authentication required' })
  remove(@Param('id') id: string) {
    return this.dogcategoryService.remove(id);
  }
}
