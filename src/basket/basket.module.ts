import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { User } from 'src/user/user.entity';
import { BasketItem } from './basket-item.entity';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [TypeOrmModule.forFeature([BasketItem, User]), BookModule],
  exports: [BasketService]
})
export class BasketModule { }
