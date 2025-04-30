import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: "Password must contain only letters and numbers",
    })
    password: string;

}
