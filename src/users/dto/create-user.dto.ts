import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber()
    readonly phone: string;

    @IsString()
    @IsStrongPassword()
    readonly password: string;
}
