import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    description: 'Updated URL of the blog image or featured image',
    example: 'https://example.com/images/updated-pet-care-tips.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Updated alternative text for the blog image',
    example: 'Professional dog grooming techniques demonstration',
    required: false
  })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiProperty({
    description: 'Updated blog category tag',
    example: 'Dog Grooming',
    required: false
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    description: 'Updated title of the blog post',
    example: 'Professional Tips for Grooming Your Dog at Home',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Updated main content of the blog post',
    example: 'Professional groomers recommend regular grooming sessions to keep your dog looking and feeling their best. This updated guide covers...',
    required: false
  })
  @IsString()
  @IsOptional()
  content?: string;
}
