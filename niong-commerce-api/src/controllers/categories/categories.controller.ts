import { Controller } from '@nestjs/common';
import { CrudController } from '../crud.controller';
import { Category } from '../../models/category.model';
import { InjectModel } from '@nestjs/mongoose';

@Controller('categories')
export class CategoriesController extends CrudController<Category> {
  constructor(@InjectModel(Category.name) model) {
    super(model, Category);
  }
}
