import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: "User email", example: "email@example"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: "User password", example: "password123"})
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: "Password must contain only letters and numbers",
    })
    password: string;

}
