import { PartialType } from '@nestjs/mapped-types';
import { CreateDogcolorDto } from './create-dogcolor.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDogcolorDto extends PartialType(CreateDogcolorDto) {
    @ApiProperty({
        description: 'O nome da cor do cachorro',
        example: 'Marrom',
        required: false
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'O código hexadecimal da cor',
        example: '#8B4513',
        required: false
    })
    @IsOptional()
    @IsString()
    color?: string;
}
