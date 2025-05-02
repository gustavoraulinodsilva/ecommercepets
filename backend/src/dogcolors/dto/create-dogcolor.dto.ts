import { IsNotEmpty } from "class-validator";

export class CreateDogcolorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;
}
