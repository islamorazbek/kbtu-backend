import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { FileService } from 'src/file/file.service';
import { ShopService } from 'src/shop/shop.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private fileService: FileService,
    private shopService: ShopService
  ) { }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async createBook(dto: CreateBookDto, image: any) {
    const fileName = await this.fileService.uploadFile(image[0])

    const { categoryId } = dto;

    if (!categoryId) {
      throw new HttpException("category is requried", 400)
    }
    const category = await this.categoryRepository.findOneBy({ id: categoryId })
    const shop = await this.shopService.getShopById(dto.shopId)

    if (!category) {
      throw new HttpException("category not found", 400)
    }
    if(!shop) {
      throw new HttpException("shop not found", 400)
    }
    delete dto.categoryId;
    const book = await this.bookRepository.save({ ...dto, shop: shop, category: category, photo: fileName });
    return book;
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

  async getBookById(id: number) {
    return this.bookRepository.findOneBy({ id })
  }
}
