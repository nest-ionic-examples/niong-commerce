import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import {
  EntityActionOptions,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory, EntityOp,
  QueryParams
} from '@ngrx/data';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends EntityCollectionServiceBase<Category> {
  constructor(factory: EntityCollectionServiceElementsFactory) { super('Category', factory); }
}
