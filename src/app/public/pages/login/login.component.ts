import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}


  authData = {
    email: '',
    password: ''
  };
  errorMessage: string = ''; 

  async login(form: NgForm) {
    console.log('Login button clicked');
    //Valor del formulario para no usar NgModel
    console.log(form.value);
    const token = await this.authService.login(form.value);
    if (token) {
      this.router.navigate(['/contact']).then(() => {
        window.location.reload();
      });
    }
  }

  async register (form :NgForm){
    console.log('el boton de register fue presionado')
    
  }
}
