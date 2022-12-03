import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }]))
  createCategory(@Body() dto: CreateCategoryDto, @UploadedFiles() files: { icon: Express.Multer.File }): Promise<Category> {
    return this.categoryService.createCategory(dto, files.icon)
  }
  
}
