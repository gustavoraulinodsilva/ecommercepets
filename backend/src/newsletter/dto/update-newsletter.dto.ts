import { PartialType } from '@nestjs/swagger';
import { CreateNewsletterDto } from './create-newsletter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateNewsletterDto extends PartialType(CreateNewsletterDto) {
    @ApiProperty({
        description: 'Updated email address for the newsletter subscription',
        example: 'newemail@example.com',
        required: false
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsOptional()
    @IsString()
    email?: string;
}
