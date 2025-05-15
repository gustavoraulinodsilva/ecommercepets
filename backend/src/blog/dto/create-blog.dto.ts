import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
    @ApiProperty({
        description: 'URL of the blog image or featured image',
        example: 'https://example.com/images/pet-care-tips.jpg',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        description: 'Alternative text for the blog image',
        example: 'Dog being groomed at home',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    alt: string;

    @ApiProperty({
        description: 'Blog category tag',
        example: 'Pet Care',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    tag: string;

    @ApiProperty({
        description: 'Title of the blog post',
        example: 'Essential Tips for Grooming Your Dog at Home',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Main content of the blog post',
        example: 'Regular grooming is essential for keeping your dog healthy and comfortable. Start by gathering the right tools...',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}
