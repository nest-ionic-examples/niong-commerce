import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Category } from '../models/category';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends EntityCollectionServiceBase<Category> {
  constructor(factory: EntityCollectionServiceElementsFactory) { super('Category', factory); }
}
