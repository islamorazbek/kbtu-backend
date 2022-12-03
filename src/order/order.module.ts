import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from 'src/basket/basket.module';
import { UserModule } from 'src/user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order]), BasketModule],
  exports: [OrderService]
})
export class OrderModule { }