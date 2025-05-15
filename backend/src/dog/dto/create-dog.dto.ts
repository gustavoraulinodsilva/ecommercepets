import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateDogDto {
    @ApiProperty({
        description: 'Dog SKU identifier',
        example: 'DOG-12345'
    })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty({
        description: 'Breed ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsUUID()
    breedId: string;

    @ApiProperty({
        description: 'Dog price',
        example: '1200.00'
    })
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty({
        description: 'Dog gender',
        enum: ['Male', 'Female'],
        example: 'Male'
    })
    @IsEnum(['Male', 'Female'])
    gender: 'Male' | 'Female';

    @ApiProperty({
        description: 'Dog age',
        example: '2 years'
    })
    @IsString()
    @IsNotEmpty()
    age: string;

    @ApiProperty({
        description: 'Category IDs for the dog', 
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty({
        description: 'Color IDs for the dog',
        type: [String],
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001']
    })
    @IsArray()
    @IsUUID(undefined, { each: true })
    colorIds: string[];

    @ApiProperty({
        description: 'Is the dog vaccinated',
        default: false
    })
    @IsBoolean()
    @IsOptional()
    vaccinated?: boolean;

    @ApiProperty({
        description: 'Is the dog dewormed',
        default: false
    })
    @IsBoolean()
    @IsOptional()
    dewormed?: boolean;

    @ApiProperty({
        description: 'Is the dog certified',
        default: false
    })
    @IsBoolean()
    @IsOptional()
    certified?: boolean;

    @ApiProperty({
        description: 'Does the dog have a microchip',
        default: false
    })
    @IsBoolean()
    @IsOptional()
    microship?: boolean;

    @ApiProperty({
        description: 'Dog location',
        example: 'New York, NY'
    })
    @IsString()
    @IsNotEmpty()
    localization: string;

    @ApiProperty({
        description: 'Publication date',
        example: '2025-05-02',
        format: 'date'
    })
    @IsNotEmpty()
    @Transform(({ value }) => {
        // Accept any valid date format and convert to Date object
        if (value instanceof Date) return value;
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }
        return date;
    })
    publicationDate: Date;

    @ApiProperty({
        description: 'Dog description',
        example: 'A friendly and energetic dog looking for a loving home.'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}
