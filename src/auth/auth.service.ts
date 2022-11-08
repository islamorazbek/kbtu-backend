import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { Repository } from "typeorm";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { RegisterUserDto } from "../user/dto/register-user.dto";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Token } from "./token.entity";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,) {
    }

    private generationToken(user: User) {
        const payload = { id: user.id }
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { secret: "refresh", expiresIn: "30d" })
        }
    }

    async login(dto: LoginUserDto, res) {
        const user = await this.validation(dto)
        const tokens = await this.generationToken(user)
        res.cookie('refreshToken', tokens.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        await this.saveToken(user.id, tokens.refresh_token)
        delete user.password
        return { access_token: tokens.access_token }
    }

    async registration(dto: RegisterUserDto, res) {
        const errors = {}
        const candidate = await this.userService.getUserWithEmail(dto.email)

        if (candidate) {
            errors['email'] = ['такой email уже есть']
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST)
        }

        try {
            let user = await this.userService.createUser(dto)
            const tokens = await this.generationToken(user)
            res.cookie('refreshToken', tokens.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            delete user.password
            return { access_token: tokens.access_token }
        } catch (e) {
            errors['error'] = ['что то пошло не так']
            throw new HttpException(errors, HttpStatus.BAD_REQUEST)
        }
    }

    private async saveToken(userId: number, refresh_token: string) {
        const candidate = await this.tokenRepository.findOne({ where: { userId } })
        if (candidate) {

            return await this.tokenRepository.update({ id: candidate.id }, { refresh_token })
        }
        return await this.tokenRepository.save({ refresh_token, userId })
    }

    private async validation(dto: LoginUserDto): Promise<User> {

        const user = await this.userService.getUserWithEmail(dto.email)
        const errors = {}
        if (!user) {
            errors['email'] = ["Некорректный емейл"]
            throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const campfirePassword = await bcrypt.compare(dto.password, user.password)
        if (!campfirePassword) {
            errors['password'] = ["Некорректный пороль"]
            throw new HttpException({ errors }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return user
    }

    private async findRefreshToken(refresh_token: string) {
        return await this.tokenRepository.findOne({ where: { refresh_token } })
    }

    private verifyRefreshToken(refresh_token: string): { id: number, email: string } {
        return this.jwtService.verify(refresh_token, { secret: "refresh" })
    }

    async refresh(refresh_token, res) {
        if (!refresh_token) {
            throw new UnauthorizedException({ message: "вы не загерестрированы" })
        }
        const verifyToken = this.verifyRefreshToken(refresh_token)
        console.log(verifyToken)
        const refreshTokenFromDB = await this.findRefreshToken(refresh_token)
        if (!verifyToken || !refreshTokenFromDB) {
            throw new UnauthorizedException({ message: "вы не загерестрированы" })
        }
        const user = await this.userService.findById(verifyToken.id)
        const tokens = this.generationToken(user)
        await this.saveToken(user.id, tokens.refresh_token)
        res.cookie('refreshToken', tokens.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return { ...tokens, user }
    }

    async logout(refresh_token: string) {
        return await this.tokenRepository.delete({ refresh_token })
    }

    verifyToken(token: string): User {
        return this.jwtService.verify(token, { secret: "hello world" })
    }

}
