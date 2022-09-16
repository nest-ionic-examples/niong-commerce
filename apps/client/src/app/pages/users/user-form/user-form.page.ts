import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-product-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage {

  operation;

  model = {} as User;

  constructor(private svc: UsersService, private location: Location, route: ActivatedRoute) {
    const id = route.snapshot.params['id'];
    this.operation = id ? 'edit' : 'add';
    if (id) svc.findById(id).subscribe(value => this.model = value);
  }

  submit(form: NgForm) {
    if (form.invalid) { return; }

    this.svc.save(this.model).subscribe(() => this.location.back());
  }
}
