import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
    private basketService: BasketService
  ) { }

  async createOrder(dto: CreateOrderDto, userId: number) {
    const basketItems = await this.basketService.getBasketItemsByUserId(userId)
    

  }
}
