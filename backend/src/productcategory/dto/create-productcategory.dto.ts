import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductcategoryDto {
    @ApiProperty({
        description: 'Name of the product category',
        example: 'Dog Food',
        required: true
    })
    @IsNotEmpty({ message: 'Category name is required' })
    @IsString({ message: 'Category name must be a string' })
    name: string;
}
