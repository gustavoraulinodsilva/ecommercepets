import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductcarouselDto } from 'src/productcarousel/dto/create-productcarousel.dto';

// Include a nested DTO for carousel items
class CreateProductCarouselItemDto {
  @ApiProperty({
    description: 'URL of the carousel image',
    example: 'https://example.com/images/product1.jpg',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Alternative text for the carousel image',
    example: 'Dog food product front view',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  alt: string;

  @ApiProperty({
    description: 'Display order in the carousel (lower numbers appear first)',
    example: 1,
    required: true
  })
  @IsNumber()
  order: number;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'PROD-12345',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Premium Dog Food',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'Product price',
    example: 29.99,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'Product availability in stock',
    example: true,
    default: false
  })
  @IsBoolean()
  stock: boolean;

  @ApiProperty({
    description: 'Product size',
    example: 'Medium',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    description: 'Product description',
    example: 'High-quality premium dog food made with natural ingredients',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Product carousel images',
    type: [CreateProductCarouselItemDto],
    required: false
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductcarouselDto)
  productCarousels?: CreateProductcarouselDto[];
}
