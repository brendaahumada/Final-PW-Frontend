import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { iAuthRequest } from 'src/app/Core/Interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

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
  };

  async login(form: NgForm) {
    console.log('Login button clicked');
    
    const token = await this.auth.login(form.value.email, form.value.password);
    
    if (token) {
      this.router.navigate(['/contact']).then(() => {
        window.location.reload();
      });
    }
  }
}
