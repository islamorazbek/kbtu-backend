import {
    Column,
    Entity, OneToOne, PrimaryGeneratedColumn
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { Basket } from "src/basket/basket.entity";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "user@gmail.com", description: "user email" })
    @Column({ unique: true, nullable: false, update: false })
    email: string;

    @ApiProperty({ example: "123456", description: "пороль пользователя" })
    @Column({nullable: false})
    password: string;

    @ApiProperty({ example: "Алмас", description: "имя пользователя" })
    @Column({nullable: false})
    firstName: string;

    @ApiProperty({ example: "Жумаханов", description: "фамилия пользователя" })
    @Column({nullable: false})
    lastName: string

    @Column({ default: false })
    blocked: boolean

    @OneToOne(()=>Basket,basket=>basket.user)
    basket:Basket

}