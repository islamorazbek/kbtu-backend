import {
    Column,
    Entity, OneToMany, OneToOne, PrimaryGeneratedColumn
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/order/order.entity";
import { BasketItem } from "src/basket/basket-item.entity";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "user@gmail.com", description: "user email" })
    @Column({ unique: true, nullable: false, update: false })
    email: string;

    @ApiProperty({ example: "123456", description: "пороль пользователя" })
    @Column({ nullable: false })
    password: string;

    @ApiProperty({ example: "Алмас", description: "имя пользователя" })
    @Column({ nullable: false })
    firstName: string;

    @ApiProperty({ example: "Жумаханов", description: "фамилия пользователя" })
    @Column({ nullable: false })
    lastName: string

    @Column({ default: false })
    blocked: boolean

    @OneToOne(() => BasketItem, basketItem => basketItem.user)
    basketItems: BasketItem[]

    @OneToMany(() => Order, order => order.user)
    orders: Order[]

}