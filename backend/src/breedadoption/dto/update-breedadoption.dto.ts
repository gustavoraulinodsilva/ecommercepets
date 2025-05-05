import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { CreateBreedadoptionDto } from './create-breedadoption.dto';

export class UpdateBreedadoptionDto extends PartialType(CreateBreedadoptionDto) {
    @ApiProperty({
        description: 'URL of the adoption image',
        example: 'https://example.com/adoption-image.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    url?: string;

    @ApiProperty({
        description: 'Alternative text for the image',
        example: 'Golden Retriever puppy available for adoption',
        required: false
    })
    @IsString()
    @IsOptional()
    alt?: string;

    @ApiProperty({
        description: 'Display order of the image in the adoption carousel',
        example: 1,
        minimum: 1,
        required: false
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    order?: number;
}
