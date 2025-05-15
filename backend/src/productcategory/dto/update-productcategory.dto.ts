import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProductcategoryDto } from './create-productcategory.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductcategoryDto extends PartialType(CreateProductcategoryDto) {
    @ApiProperty({
        description: 'Updated name of the product category',
        example: 'Premium Dog Food',
        required: false
    })
    @IsString()
    @IsOptional()
    name?: string;
}
