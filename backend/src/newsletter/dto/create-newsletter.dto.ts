import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsletterDto {
    @ApiProperty({
        description: 'Email address to subscribe to the newsletter',
        example: 'user@example.com',
        required: true
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsString()
    email: string;
}
