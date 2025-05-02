import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'O endereço de email do usuário',
        example: 'usuario@example.com',
        required: false
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        description: 'A senha do usuário',
        example: 'senha123',
        required: false,
        minLength: 6
    })
    @IsString()
    @IsOptional()
    @MinLength(6)
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: "Password must contain only letters and numbers",
    })
    password: string;
}
