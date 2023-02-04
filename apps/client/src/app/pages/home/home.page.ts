import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  popularProducts: Product[] = [
    {_id: 'product-1', title: 'Popular Product 1', image: 'assets/images/items/1.jpg', description: 'Popular Product 1 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 2', image: 'assets/images/items/2.jpg', description: 'Popular Product 2 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 3', image: 'assets/images/items/3.jpg', description: 'Popular Product 3 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 4', image: 'assets/images/items/4.jpg', description: 'Popular Product 4 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 5', image: 'assets/images/items/5.jpg', description: 'Popular Product 5 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 6', image: 'assets/images/items/6.jpg', description: 'Popular Product 6 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 7', image: 'assets/images/items/7.jpg', description: 'Popular Product 7 Description', price: 179},
    {_id: 'product-1', title: 'Popular Product 8', image: 'assets/images/items/8.jpg', description: 'Popular Product 8 Description', price: 179},
  ];

}
