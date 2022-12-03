import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDecorator } from 'src/user/decorator/User.decorator';
import { BasketItem } from './basket-item.entity';
import { BasketService } from './basket.service';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) { }

  @ApiOperation({ summary: "создание basket item" })
  @ApiResponse({ status: 201, type: BasketItem })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createItem(@Body() dto: CreateBasketItemDto, @UserDecorator('id') userId: number) {
    return this.basketService.addBookToBasket(dto, userId)
  }

  @ApiOperation({ summary: "удаление basket item" })
  @ApiResponse({ status: 201, type: BasketItem })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  deleteItem(@Body() dto: { basketItemId: number }) {
    return this.basketService.deleteBookFromBasket(dto.basketItemId)
  }
}
