import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class signinAuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
