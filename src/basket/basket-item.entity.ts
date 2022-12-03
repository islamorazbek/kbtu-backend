import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";
import { Order } from "src/order/order.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

const example = {
  "id": 16,
  "title": "productName",
  "smallDesc": "smt",
  "fullDesc": "smtsmt",
  "image": "3d139861-37c7-464d-b95d-c6b24fa83183.jpg",
  "price": 500,
  "discount": 0
}
@Entity('basket_items')
export class BasketItem {
  @ApiProperty({ example: 1, description: "айди basket item" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: example, description: "id of book", type: () => [Book] })
  @ManyToOne(() => Book, book => book.id)
  book: Book;

  @ApiProperty({ example: 1, description: "book quantity" })
  @Column()
  qty: number;

  @ManyToOne(() => Order, order => order.books)
  order: Order;

  @ManyToOne(() => User, user => user.basketItems)
  @JoinColumn({ name: 'basket_id' })
  user: User
}