import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDogcategoryDto {
    @ApiProperty({
        description: 'The category of the dog is linked to the size of the dog',
        example: 'Small, Medium, Large'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
