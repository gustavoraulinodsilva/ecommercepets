import { PartialType } from '@nestjs/mapped-types';
import { CreateDogcolorDto } from './create-dogcolor.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDogcolorDto extends PartialType(CreateDogcolorDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    color?: string;
}
