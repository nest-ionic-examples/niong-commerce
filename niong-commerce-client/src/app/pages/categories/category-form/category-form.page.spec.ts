import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormPage } from './category-form.page';

describe('CategoryFormPage', () => {
  let component: CategoryFormPage;
  let fixture: ComponentFixture<CategoryFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
