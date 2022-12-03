import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { BasketItem } from './basket-item.entity';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketItem) private basketItemRepository: Repository<BasketItem>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private bookService: BookService,
  ) { }

  async getBasketItemsByUserId(id: number) {
    return await this.basketItemRepository.find({ where: { user: { id } } })
  }

  async addBookToBasket(dto: CreateBasketItemDto, userId: number) {
    const { bookId, qty } = dto;
    const book = this.bookService.findOne(bookId)
    if (!book) {
      throw new HttpException("Book not found", 400)
    }
    const candidate = await this.basketItemRepository.findOneBy({ user: { id: userId }, book: { id: bookId } })
    if (candidate) {
      candidate.qty = qty;
      return await this.basketItemRepository.update(candidate.id, candidate);
    } else {
      return await this.basketItemRepository.save({ book: { id: bookId }, user: { id: userId }, qty: qty || 1 })
    }
  }

  async deleteBookFromBasket(basketItemId: number) {
    return await this.basketItemRepository.delete(basketItemId)
  }

}
