import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({
        description: 'Type of inquiry',
        enum: ['Product', 'Pet'],
        example: 'Pet'
    })
    @IsEnum(['Product', 'Pet'])
    @IsNotEmpty()
    type: 'Product' | 'Pet';

    @ApiProperty({
        description: 'Full name of the contact',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Phone number',
        example: '+1 (555) 123-4567'
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Email address',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'City',
        example: 'New York'
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'State/Province',
        example: 'NY'
    })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({
        description: 'UUID of the related route/item',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty()
    route_uuid: string;
}
