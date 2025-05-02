import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateBreedcarouselDto } from "src/breedcarousel/dto/create-breedcarousel.dto";

export class CreateBreedDto {
    @ApiProperty({
        description: 'The name of the dog breed',
        example: 'Golden Retriever',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Array of carousel images for the breed',
        type: [CreateBreedcarouselDto],
        required: true,
        example: [
            {
                url: 'https://example.com/golden1.jpg',
                alt: 'Golden Retriever playing',
                order: 1
            },
            {
                url: 'https://example.com/golden2.jpg',
                alt: 'Golden Retriever sitting',
                order: 2
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBreedcarouselDto)
    breedcarousel: CreateBreedcarouselDto[];
}
