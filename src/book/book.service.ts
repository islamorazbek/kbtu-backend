import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

  async createBook(dto: CreateBookDto) {
    const book = await this.bookRepository.save(dto);
    return book
  }

  async editBook(dto: EditBookDto) {
    const { id } = dto;
    let book = await this.bookRepository.findOneBy({ id })
    if (!book) {
      throw new HttpException("book not found", 400)
    }
    return await this.bookRepository.save({ ...book, ...dto })
  }
}
