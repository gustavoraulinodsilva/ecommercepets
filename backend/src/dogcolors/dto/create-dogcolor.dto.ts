import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDogcolorDto {
    @ApiProperty({
        description: 'O nome da cor do cachorro',
        example: 'Marrom',
        required: true
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'O código hexadecimal da cor',
        example: '#8B4513',
        required: true
    })
    @IsNotEmpty()
    color: string;
}
