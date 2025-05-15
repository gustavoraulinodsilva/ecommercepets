import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateProductcarouselDto } from 'src/productcarousel/dto/create-productcarousel.dto';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        description: 'Updated product SKU',
        example: 'PROD-67890',
        required: false
      })
      @IsString()
      @IsOptional()
      sku?: string;
    
      @ApiProperty({
        description: 'Updated product name',
        example: 'Premium Organic Dog Food',
        required: false
      })
      @IsString()
      @IsOptional()
      name?: string;
    
      @ApiProperty({
        description: 'Updated product category ID',
        example: '123e4567-e89b-12d3-a456-426614174111',
        required: false
      })
      @IsUUID()
      @IsOptional()
      categoryId?: string;
    
      @ApiProperty({
        description: 'Updated product price',
        example: 34.99,
        required: false
      })
      @IsString()
      @IsOptional()
      price?: string;
    
      @ApiProperty({
        description: 'Updated product availability in stock',
        example: true,
        required: false
      })
      @IsBoolean()
      @IsOptional()
      stock?: boolean;
    
      @ApiProperty({
        description: 'Updated product size',
        example: 'Large',
        required: false
      })
      @IsString()
      @IsOptional()
      size?: string;
    
      @ApiProperty({
        description: 'Updated product description',
        example: 'Premium organic dog food with added vitamins and minerals',
        required: false
      })
      @IsString()
      @IsOptional()
      description?: string;
    
      @ApiProperty({
        description: 'Updated product carousel images',
        type: [CreateProductcarouselDto],
        required: false
      })
      @IsArray()
      @IsOptional()
      @ValidateNested({ each: true })
      @Type(() => CreateProductcarouselDto)
      productCarousels?: CreateProductcarouselDto[];
}
