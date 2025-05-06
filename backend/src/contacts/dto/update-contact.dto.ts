import { PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @ApiProperty({
        description: 'Type of inquiry',
        enum: ['Product', 'Pet'],
        required: false,
        example: 'Product'
    })
    @IsEnum(['Product', 'Pet'])
    @IsOptional()
    type?: 'Product' | 'Pet';

    @ApiProperty({
        description: 'Full name of the contact',
        required: false,
        example: 'Jane Smith'
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Phone number',
        required: false,
        example: '+1 (555) 987-6543'
    })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        description: 'Email address',
        required: false,
        example: 'jane.smith@example.com'
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'City',
        required: false,
        example: 'Boston'
    })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({
        description: 'State/Province',
        required: false,
        example: 'MA'
    })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty({
        description: 'UUID of the related route/item',
        required: false,
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsOptional()
    route_uuid?: string;
}
