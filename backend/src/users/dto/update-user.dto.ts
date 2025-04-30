import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: "Password must contain only letters and numbers",
    })
    password: string;
}
