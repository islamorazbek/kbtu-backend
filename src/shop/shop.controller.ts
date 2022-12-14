import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetShopsDto } from './dto/get-shops.dto';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) { }

  @ApiOperation({ summary: "get shops" })
  @ApiResponse({ status: 200, type: Array<Shop>, description: "Get all shops" })
  @Get()
  getBooks(@Body() dto: GetShopsDto): Promise<Shop[]> {
    return this.shopService.findAll(dto.name)
  }
}
