import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = {
    username: '',
    password: ''
  };

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    await this.authSvc.login(this.model);
    this.router.navigateByUrl('/home');
  }

}
