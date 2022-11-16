import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Book) private categoryRepository: Repository<Category>
  ) { }

  async getBooks() {
    const books = await this.bookRepository.find();
    return { books: books }
  }

  async createBook(dto: CreateBookDto) {
    const { categoryId } = dto;
    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId })
      const book = await this.bookRepository.save({ ...dto, category: category });
      return book;
    }
    const book = await this.bookRepository.save(dto);
    return book
  }

  async editBook(dto: EditBookDto) {
    const { id, categoryId } = dto;
    let book = await this.bookRepository.findOneBy({ id })
    return book
    // if (!book) {
    //   throw new HttpException("book not found", 400)
    // }
    // if (categoryId) {
    //   const category = await this.categoryRepository.findOneBy({ id: categoryId })
    //   const book = await this.bookRepository.save({ ...dto, category: category });
    //   return book;
    // }
    // const book = await this.bookRepository.save(dto);
    // return book
    // return await this.bookRepository.save({ ...book, ...dto })
  }
}
