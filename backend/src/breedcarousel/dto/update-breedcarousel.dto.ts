import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedcarouselDto } from './create-breedcarousel.dto';
import { IsOptional } from 'class-validator';

export class UpdateBreedcarouselDto extends PartialType(CreateBreedcarouselDto) {
        @IsOptional()
        url: string;
    
        @IsOptional()
        alt: string;
    
        @IsOptional()
        order: number;
}
