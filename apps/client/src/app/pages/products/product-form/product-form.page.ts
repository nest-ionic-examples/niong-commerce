import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit {

  operation;

  model: any = {};

  constructor(private svc: ProductsService, private location: Location, route: ActivatedRoute) {
    const id = route.snapshot.params['id'];
    this.operation = id ? 'edit' : 'add';
    if (id) {
      svc.findById(id).subscribe(value => this.model = value);
    }
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    if (form.invalid) { return; }

    this.svc.save(this.model).subscribe(() => this.location.back());
  }
}
