import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    private fileService: FileService,
  ) { }

  findAll = async (name?: string) => {
    const shops = await this.shopRepository.find();
    if (name) {
      return shops.filter((shop) => shop.name.includes(name))
    }
    return shops;
  }

  createShop = async (dto: CreateShopDto, image: any) => {
    const fileName = await this.fileService.uploadFile(image[0])
    const shop = await this.shopRepository.save({ ...dto, photo: fileName })
    return shop;
  }

  getShopById = async (id: number) => {
    return await this.shopRepository.findOneBy({ id });
  }

}
