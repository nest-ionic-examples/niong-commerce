import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnDestroy {

  operation;

  model: User | any = {};

  subscription: Subscription;

  constructor(private svc: UsersService, private location: Location, route: ActivatedRoute) {
    const id = route.snapshot.params['id'];
    this.operation = id ? 'edit' : 'add';
    if (id) this.subscription = svc.findById(id).subscribe(value => this.model = value);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  submit(form: NgForm) {
    if (form.invalid) { return; }

    this.svc.save(this.model).subscribe(() => this.location.back());
  }
}
