import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductcarouselService } from './productcarousel.service';
import { CreateProductcarouselDto } from './dto/create-productcarousel.dto';
import { UpdateProductcarouselDto } from './dto/update-productcarousel.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Productcarousel } from './entities/productcarousel.entity';

@ApiTags('product-carousel')
@Controller('product-carousel')
export class ProductcarouselController {
  constructor(private readonly productcarouselService: ProductcarouselService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Create a new product carousel image' })
  @ApiParam({ name: 'productId', description: 'ID of the product' })
  @ApiResponse({ status: 201, description: 'The carousel image has been successfully created', type: Productcarousel })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  create(
    @Param('productId') productId: string,
    @Body() createProductcarouselDto: CreateProductcarouselDto
  ) {
    return this.productcarouselService.create(createProductcarouselDto, productId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product carousel images' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiResponse({ status: 200, description: 'List of all carousel images retrieved successfully', type: [Productcarousel] })
  findAll(@Query('productId') productId?: string) {
    if (productId) {
      return this.productcarouselService.findByProductId(productId);
    }
    return this.productcarouselService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific carousel image by ID' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image found successfully', type: Productcarousel })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  findOne(@Param('id') id: string) {
    return this.productcarouselService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a carousel image' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image updated successfully', type: Productcarousel })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  update(@Param('id') id: string, @Body() updateProductcarouselDto: UpdateProductcarouselDto) {
    return this.productcarouselService.update(id, updateProductcarouselDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a carousel image' })
  @ApiParam({ name: 'id', description: 'Carousel image ID' })
  @ApiResponse({ status: 200, description: 'Carousel image successfully deleted' })
  @ApiResponse({ status: 404, description: 'Carousel image not found' })
  remove(@Param('id') id: string) {
    return this.productcarouselService.remove(id);
  }

  @Post(':productId/reorder')
  @ApiOperation({ summary: 'Reorder carousel images for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Carousel images reordered successfully', type: [Productcarousel] })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  reorderCarouselItems(
    @Param('productId') productId: string,
    @Body() itemOrders: {id: string, order: number}[]
  ) {
    return this.productcarouselService.reorderCarouselItems(productId, itemOrders);
  }
}
