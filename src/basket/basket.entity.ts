import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('baskets')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, user => user.basket)
  @JoinColumn({ name: 'user_id' })
  user: User;
}