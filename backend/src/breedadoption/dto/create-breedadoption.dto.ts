import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateBreedadoptionDto {
    @ApiProperty({
        description: 'URL of the adoption image',
        example: 'https://example.com/adoption-image.jpg'
    })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        description: 'Alternative text for the image',
        example: 'Golden Retriever puppy available for adoption'
    })
    @IsString()
    @IsNotEmpty()
    alt: string;

    @ApiProperty({
        description: 'Display order of the image in the adoption carousel',
        example: 1,
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    order: number;
}
