import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Core/Interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async register(form: NgForm) {
    console.log('Valid form: ', form.valid);
    if (form.valid) {
      const newUser: User = {
        name: this.authData.name,
        lastName: this.authData.lastName,
        email: this.authData.email,
        password: this.authData.password,
      };

      try {
        const res = await this.userService.AddUser(newUser);
        console.log(res);
        this.authService.login({
          email: this.authData.email,
          password: this.authData.password,
        });
        this.router.navigate(['/contacts']);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
