import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedcarouselDto } from './create-breedcarousel.dto';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBreedcarouselDto extends PartialType(CreateBreedcarouselDto) {
    @ApiProperty({
        description: 'The URL of the breed image',
        example: 'https://example.com/golden-retriever.jpg',
        required: false
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    url?: string;

    @ApiProperty({
        description: 'Alternative text for the image',
        example: 'Golden Retriever playing in the park',
        required: false
    })
    @IsOptional()
    @IsString()
    alt?: string;

    @ApiProperty({
        description: 'Display order in the carousel',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    order?: number;
}
