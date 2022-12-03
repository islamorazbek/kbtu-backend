import { ApiProperty } from "@nestjs/swagger";
import { BasketItem } from "src/basket/basket-item.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusOfOrder } from "utils/enums/OrderStatus";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default:''})
  building:string;

  @ApiProperty({example:"Seifullina",description:"street заказщика"})
  @Column({default:''})
  street:string;

  @ApiProperty({example:"Almaty",description:"city заказщика"})
  @Column()
  city:string;

  @ApiProperty({example:"Almaty",description:"city заказщика"})
  @Column()
  contact_name:string;

  @ApiProperty({example:"Almaty",description:"city заказщика"})
  @Column()
  contact_phone:string;

  @Column()
  totalPrice: number

  @Column({
    type: "enum",
    enum: StatusOfOrder,
    default: "CREATED"
  })
  status: StatusOfOrder

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Order

  @OneToMany(() => BasketItem, item => item.order)
  books: BasketItem[]
}