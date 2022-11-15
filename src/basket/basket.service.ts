import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from './basket.entity';
import { AddItemToBasketDto } from './dto/add-item-to-basket.dto';

@Injectable()
export class BasketService {
  constructor(@InjectRepository(Basket) private basketRepository: Repository<Basket>) { }

  async addItemToBasket(dto: AddItemToBasketDto) {
    // return await this.basketRepository.create(dto)
  }

}
