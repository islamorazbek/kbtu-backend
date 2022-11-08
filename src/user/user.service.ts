import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(dto: RegisterUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.saveUser({ ...dto, password: hashPassword })
        delete user.password
        return user
    }

    private async saveUser(dto: RegisterUserDto): Promise<User> {
        return await this.userRepository.save(dto)
    }


    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        for (let user of users) {
            delete user.password
        }
        return users
    }

    async getUserWithEmail(email: string, relationList?: string[]): Promise<User> {
        if (relationList) {
            return await this.userRepository.findOne({ where: { email }, relations: relationList })
        }
        return await this.userRepository.findOne({ where: { email } });
    }

    async findById(id: number) {
        return await this.userRepository.findOne({ where: { id } })
    }

    async save(user: User) {
        await this.userRepository.save(user)
    }

    async updateUserPassword(dto: UpdateUserPasswordDto, id: number) {
        const user = await this.userRepository.findOne({ where: { id } })
        const campfirePassword = await bcrypt.compare(dto.oldPassword, user.password)
        if (!campfirePassword) {
            throw new HttpException("не верный пороль", 400)
        }
        user.password = await bcrypt.hash(dto.newPassword, 5);
        await this.userRepository.save(user)
        return { message: "Пороль успешно изменен" }

    }
}
