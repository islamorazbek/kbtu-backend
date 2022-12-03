import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDecorator } from 'src/user/decorator/User.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @ApiOperation({ summary: "создание заказа" })
  @ApiResponse({ status: 201, type: Order })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() dto: CreateOrderDto, @UserDecorator('id') userId: number) {
    return this.orderService.createOrder(dto, userId)
  }

}
