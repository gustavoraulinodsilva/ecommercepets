import { PartialType } from '@nestjs/mapped-types';
import { CreateDogDto } from './create-dog.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateDogDto extends PartialType(CreateDogDto) {
    @ApiProperty({
        description: 'Dog SKU identifier',
        example: 'DOG-12345',
        required: false
    })
    @IsString()
    @IsOptional()
    sku?: string;

    @ApiProperty({
        description: 'Breed ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    })
    @IsUUID()
    @IsOptional()
    breedId?: string;

    @ApiProperty({
        description: 'Dog price',
        example: '1200.00',
        required: false
    })
    @IsString()
    @IsOptional()
    price?: string;

    @ApiProperty({
        description: 'Dog gender',
        enum: ['Male', 'Female'],
        example: 'Male',
        required: false
    })
    @IsEnum(['Male', 'Female'])
    @IsOptional()
    gender?: 'Male' | 'Female';

    @ApiProperty({
        description: 'Dog age',
        example: '2 years',
        required: false
    })
    @IsString()
    @IsOptional()
    age?: string;

    @ApiProperty({
        description: 'Dog size',
        example: 'Medium',
        required: false
    })
    @IsString()
    @IsOptional()
    size?: string;

    @ApiProperty({
        description: 'Color IDs for the dog',
        type: [String],
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        required: false
    })
    @IsArray()
    @IsUUID(undefined, { each: true })
    @IsOptional()
    colorIds?: string[];

    @ApiProperty({
        description: 'Is the dog vaccinated',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    vaccinated?: boolean;

    @ApiProperty({
        description: 'Is the dog dewormed',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    dewormed?: boolean;

    @ApiProperty({
        description: 'Is the dog certified',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    certified?: boolean;

    @ApiProperty({
        description: 'Does the dog have a microchip',
        required: false
    })
    @IsBoolean()
    @IsOptional()
    microship?: boolean;

    @ApiProperty({
        description: 'Dog location',
        example: 'New York, NY',
        required: false
    })
    @IsString()
    @IsOptional()
    localization?: string;

    @ApiProperty({
        description: 'Publication date',
        example: '2025-05-02',
        required: false
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return undefined;
        if (value instanceof Date) return value;
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }
        return date;
    })
    publicationDate?: Date;

    @ApiProperty({
        description: 'Dog description',
        example: 'A friendly and energetic dog looking for a loving home.',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;
}
