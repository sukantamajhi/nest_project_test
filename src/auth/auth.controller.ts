import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { signinAuthDto } from "./dto/signin-auth.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Post("login")
    login(@Body() signinAuthDto: signinAuthDto) {
        return this.authService.login(signinAuthDto);
    }
}
