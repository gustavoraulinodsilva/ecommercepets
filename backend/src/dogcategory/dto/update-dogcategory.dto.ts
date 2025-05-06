import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDogcategoryDto } from './create-dogcategory.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDogcategoryDto extends PartialType(CreateDogcategoryDto) {
    @ApiProperty({
        description: 'nest generate resource dog --no-spec',
        example: 'Small, Medium, Large',
        required: true
    })
    @IsString()
    @IsOptional()
    name?: string;
}
