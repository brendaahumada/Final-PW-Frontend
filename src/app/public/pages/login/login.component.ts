import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { iAuthRequest } from 'src/app/Core/Interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) {}

  authData: iAuthRequest = {
    email: '',
    password: '',
    name:'',
  };

  async login(form: NgForm) {
    console.log('Login button clicked');
    //Valor del formulario para no usar NgModel
    console.log(form.value);
    const token = await this.auth.login(form.value);
    if (token) {
      this.router.navigate(['/contacts']).then(() => {
        window.location.reload();
      });
    }
  }
}
