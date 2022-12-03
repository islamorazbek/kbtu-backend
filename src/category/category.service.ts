import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private fileService: FileService,
    ) { }

  async getCategories() {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async createCategory(dto: CreateCategoryDto, icons: any) {
    const fileName = await this.fileService.uploadFile(icons[0])
    
    const category = await this.categoryRepository.save({...dto, icon: fileName});
    return category
  }
}
