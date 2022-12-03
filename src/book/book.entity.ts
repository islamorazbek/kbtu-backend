import { Category } from "src/category/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: string

  @Column()
  photo?: string

  @ManyToOne(() => Category, category => category.books)
  @JoinColumn({ name: 'category_id' })
  category: Category

}