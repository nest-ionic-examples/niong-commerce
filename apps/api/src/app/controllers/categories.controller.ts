import { Controller } from '@nestjs/common';
import { CrudController } from '../base/controllers/crud.controller';
import { Category } from '../models/category.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController extends CrudController<Category> {
  constructor(@InjectModel(Category) model) {
    super(model, Category);
  }
}
