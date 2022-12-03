import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketModule } from 'src/basket/basket.module';
import { OrderModule } from 'src/order/order.module';
import { UserController } from './user.controller';
import { User } from "./user.entity";
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), BasketModule, OrderModule],
  exports: [UserService]
})

export class UserModule { }
