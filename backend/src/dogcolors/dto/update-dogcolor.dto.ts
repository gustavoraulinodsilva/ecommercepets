import { PartialType } from '@nestjs/mapped-types';
import { CreateDogcolorDto } from './create-dogcolor.dto';

export class UpdateDogcolorDto extends PartialType(CreateDogcolorDto) {}
