import { Body, Controller, Get, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { ApiImplicitFile } from "@nestjs/swagger/dist/decorators/api-implicit-file.decorator";
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {

  constructor(private bookService: BookService) { }

  @ApiOperation({ summary: "update a book" })
  @ApiResponse({ status: 200, type: Array<Book>, description: "Get all books" })
  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.findAll()
  }

  @ApiOperation({ summary: "creata a book" })
  @ApiResponse({ status: 201, type: Book, description: "Create book response" })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  createBook(@Body() dto: CreateBookDto, @UploadedFiles() files: { photo: Express.Multer.File }): Promise<Book> {
    return this.bookService.createBook(dto, files.photo)
  }

  @ApiOperation({ summary: "update a book" })
  @ApiResponse({ status: 201, type: Book, description: "Update book response" })
  @Put()
  updateBook(@Body() dto: EditBookDto): Promise<Book> {
    return this.bookService.editBook(dto)
  }


}
