import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories()
  }

  @Post()
  createBook(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(dto)
  }
  
}
