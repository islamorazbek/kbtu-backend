import { Body, Controller, Post, Put } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Controller('book')
export class BookController {

  constructor(private bookService: BookService) { }

  @Post()
  createBook(@Body() dto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(dto)
  }

  @Put()
  updateBook(@Body() dto: EditBookDto): Promise<Book> {
    return this.bookService.editBook(dto)
  }

}
