import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends CrudService<Product> {

  constructor(http: HttpClient) {
    super('products', http);
  }
}
