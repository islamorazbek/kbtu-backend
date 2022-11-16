import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Controller('book')
export class BookController {

  constructor(private bookService: BookService) { }

  @ApiOperation({ summary: "creata a book" })
  @ApiResponse({ status: 201, type: Book, description: "Create book response" })
  @Post()
  createBook(@Body() dto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(dto)
  }

  @ApiOperation({ summary: "update a book" })
  @ApiResponse({ status: 201, type: Book, description: "Update book response" })
  @Put()
  updateBook(@Body() dto: EditBookDto): Promise<Book> {
    return this.bookService.editBook(dto)
  }

  @ApiOperation({ summary: "update a book" })
  // @ApiResponse({ status: 200, type: {Book[]}, description: "Update book response" })
  @Get()
  getBooks(): Promise<{ books: Book[] }> {
    return this.bookService.getBooks()
  }

}
