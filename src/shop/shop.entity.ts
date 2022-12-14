import { Book } from "src/book/book.entity";
import { Category } from "src/category/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  city: string

  @Column()
  photo?: string

  @OneToMany(() => Book, book => book.shop)
  books: Book[]

}