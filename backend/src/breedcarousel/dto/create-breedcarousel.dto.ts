import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBreedcarouselDto {
    @ApiProperty({
        description: 'The URL of the breed image',
        example: 'https://example.com/golden-retriever.jpg',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @ApiProperty({
        description: 'Alternative text for the image',
        example: 'Golden Retriever playing in the park',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    alt: string;

    @ApiProperty({
        description: 'Display order in the carousel',
        example: 1,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    order: number;
}
