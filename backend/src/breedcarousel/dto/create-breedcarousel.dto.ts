import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBreedcarouselDto {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    alt: string;

    @IsOptional()
    @IsNumber()
    order: number;
}
