import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateShopDto } from './dto/create-shop.dto';
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

  @ApiOperation({ summary: "creata a shop" })
  @ApiResponse({ status: 201, type: Shop, description: "Create shop response" })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  createBook(@Body() dto: CreateShopDto, @UploadedFiles() files: { photo: Express.Multer.File }): Promise<Shop> {
    return this.shopService.createShop(dto, files.photo)
  }
}
