import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends CrudService<Category>{
  constructor(http: HttpClient) { super('orders', http); }
}
