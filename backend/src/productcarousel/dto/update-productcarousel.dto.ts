import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProductcarouselDto } from './create-productcarousel.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductcarouselDto extends PartialType(CreateProductcarouselDto) {
    @ApiProperty({
        description: 'Updated URL of the carousel image',
        example: 'https://example.com/images/updated-product1.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    url?: string;
    
    @ApiProperty({
        description: 'Updated alternative text for the carousel image',
        example: 'Dog food product side view',
        required: false
    })
    @IsString()
    @IsOptional()
    alt?: string;
    
    @ApiProperty({
        description: 'Updated display order in the carousel (lower numbers appear first)',
        example: 2,
        required: false,
        type: Number
    })
    @IsNumber()
    @IsOptional()
    order?: number;
}
