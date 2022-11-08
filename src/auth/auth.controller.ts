import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { RegisterUserDto } from "../user/dto/register-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.entity";
import { AuthResponseDto } from './dto/access-token.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({ summary: "login пользователя" })
    @ApiResponse({ status: 201, type: AuthResponseDto, description: "Auth access token, set it to localStorage" })
    @Post('login')
    login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res) {
        return this.authService.login(dto, res)
    }

    @ApiOperation({ summary: "регестрация пользователя" })
    @ApiResponse({ status: 201, type: AuthResponseDto, description: "Auth access token, set it to localStorage" })
    @Post('registration')
    registration(@Body() dto: RegisterUserDto, @Res({ passthrough: true }) res) {
        return this.authService.registration(dto, res)
    }

    @Get('refresh')
    refresh(@Req() request, @Res({ passthrough: true }) response) {
        console.log(request)
        const { refreshToken } = request.cookies
        return this.authService.refresh(refreshToken, response)
    }

    @Get('logout')
    logout(@Req() request, @Res({ passthrough: true }) response) {
        const { refreshToken } = request.cookies
        response.clearCookie('refreshToken')
        return this.authService.logout(refreshToken)
    }
}
