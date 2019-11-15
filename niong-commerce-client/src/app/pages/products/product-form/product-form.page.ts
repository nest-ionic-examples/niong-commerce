import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit, OnDestroy {

  operation;

  model: any = {};

  subscription: Subscription;

  constructor(private svc: ProductsService, private location: Location, route: ActivatedRoute) {
    const id = route.snapshot.params['id'];
    this.operation = id ? 'edit' : 'add';
    if (id) {
      this.subscription = svc.findById(id).subscribe(value => this.model = value);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  submit(form: NgForm) {
    if (form.invalid) { return; }

    this.svc.save(this.model).subscribe(() => this.location.back());
  }
}
