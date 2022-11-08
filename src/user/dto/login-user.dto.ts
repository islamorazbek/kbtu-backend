import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, Length, Min} from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({message:"Введите Email"})
    @IsEmail({},{message:"Неправльный формат Email"})
    @ApiProperty({example:"almas@gmail.com",description:"Почта"})
    email:string
    @IsNotEmpty({message:"Введите пароль"})
    @Length(5,16,{message:"Пароль должен содержать 5-16 символов"})
    @ApiProperty({example: "12345", description: "пороль"})
    password:string
}