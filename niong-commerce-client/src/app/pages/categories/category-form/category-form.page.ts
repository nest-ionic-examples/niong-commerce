import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
})
export class CategoryFormPage implements OnInit {

  operation: string;

  model: Category | any = {};

  constructor(private svc: CategoriesService,
              private route: ActivatedRoute,
              private location: Location) {
    const id = route.snapshot.params['id'];
    this.operation = id ? 'edit' : 'add';
    if (id) {
      svc.entityMap$.pipe(
        switchMap(em => em[id] ? of(em[id]) : svc.getByKey(id)),
        first(),
      ).subscribe(value => this.model = {...value});
    }
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.svc.upsert(this.model).subscribe(() => this.location.back());
  }
}
