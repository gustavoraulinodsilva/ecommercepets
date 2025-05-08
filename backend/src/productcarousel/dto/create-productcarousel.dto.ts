import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductcarouselDto {
    @ApiProperty({
        description: 'URL of the carousel image',
        example: 'https://example.com/images/product1.jpg',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({
        description: 'Alternative text for the carousel image',
        example: 'Dog food product front view',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    alt: string;

    @ApiProperty({
        description: 'Display order in the carousel (lower numbers appear first)',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    order: number;
}
