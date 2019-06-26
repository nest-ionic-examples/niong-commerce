import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User> {

  constructor(http: HttpClient) {
    super('users', http);
  }
}
