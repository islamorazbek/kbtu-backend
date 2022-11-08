import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty({ example: "test@test.com", description: "email" })
    @IsEmail({}, { message: "не вервый формат email" })
    email: string

    @ApiProperty({ example: "123456", description: "password" })
    @IsNotEmpty({ message: "это поля не должен быть пустым" })
    password: string

    @ApiProperty({ example: "87075545401", description: "phone number" })
    phone: string;

    @ApiProperty({ example: "Islam", description: "first name" })
    firstName: string;

    @ApiProperty({ example: "Orazbek", description: "last name" })
    lastName: string;
}