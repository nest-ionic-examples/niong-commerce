import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  columns = ['title', 'image', 'description', 'price', 'created', 'actions'];

  dataSource$: Observable<Product[]>;

  params: any = {};

  page: Page<Product> = {
    size: 20,
    number: 1
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productsSvc: ProductsService) {
    this.dataSource$ = route.queryParams.pipe(switchMap(params => {
      this.params = params;
      const page = Number(params.page);
      const limit = Number(params.limit);
      const _params = Object.assign({}, params, {
        page: page && page > 0 ? page : 1,
        limit: limit && limit > 0 ? limit : 20
      });
      return this.productsSvc.find(_params).pipe(map(_page => {
        this.page = _page;
        return _page.items;
      }));
    }));
  }

  ngOnInit() {
  }

  navigate(params) {
    this.router.navigate([], {relativeTo: this.route, queryParams: params});
  }

  handlePageChange(event: PageEvent) {
    this.navigate({...this.params, page: event.pageIndex + 1, limit: event.pageSize});
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {_refresh: new Date().getTime()},
      skipLocationChange: true
    });
  }

  deleteById(_id: any) {
    this.productsSvc.deleteById(_id).subscribe(() => this.refresh());
  }
}
