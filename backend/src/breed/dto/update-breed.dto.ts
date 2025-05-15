import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBreedcarouselDto } from '../../breedcarousel/dto/create-breedcarousel.dto';
import { CreateBreedadoptionDto } from 'src/breedadoption/dto/create-breedadoption.dto';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {
    @ApiProperty({
        description: 'The name of the dog breed',
        example: 'Golden Retriever',
        required: false
    })
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty({
        description: 'Carousel images for the breed',
        type: [CreateBreedcarouselDto],
        required: false
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBreedcarouselDto)
    breedcarousel?: CreateBreedcarouselDto[];

    @ApiProperty({ type: [CreateBreedadoptionDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBreedadoptionDto)
    breedadoption?: CreateBreedadoptionDto[];
}
