import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  model = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authSvc: AuthService, private location: Location) { }

  ngOnInit() {
  }

  submit() {
    this.authSvc.signUp(this.model).subscribe(resp => {
      console.log('resp: ', resp);
      this.location.back();
    })
  }
}
