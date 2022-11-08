import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { Basket } from './basket.entity';
import { BasketService } from './basket.service';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [TypeOrmModule.forFeature([Basket])],
  exports: [BasketService]
})
export class BasketModule {}
