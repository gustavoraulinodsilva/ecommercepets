import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedcarouselDto } from './create-breedcarousel.dto';

export class UpdateBreedcarouselDto extends PartialType(CreateBreedcarouselDto) {}
