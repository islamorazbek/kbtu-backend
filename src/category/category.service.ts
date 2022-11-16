import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async getCategories() {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.save(dto);
    return category
  }
}
