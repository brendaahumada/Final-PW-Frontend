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
    // Imprime en la consola si el formulario es válido
    console.log('Valid form: ', form.valid);
  
    // Si el formulario es válido
    if (form.valid) {
      // Crea un nuevo objeto 'User' con los datos del formulario
      const newUser: User = {
        name: this.authData.name,
        lastName: this.authData.lastName,
        email: this.authData.email,
        password: this.authData.password,
      };
  
      try {
        // Intenta agregar el nuevo usuario utilizando el servicio 'userService'
        const res = await this.userService.AddUser(newUser);
        
        // Imprime en la consola la respuesta del servicio (puede contener información sobre la operación)
        console.log(res);
  
        // Intenta iniciar sesión automáticamente con las credenciales del nuevo usuario
        this.authService.login({
          email: this.authData.email,
          password: this.authData.password,
        });
  
        // Redirige al usuario a la página de contactos
        this.router.navigate(['/contact']);
      } catch (err) {
        // Captura y maneja posibles errores, imprimiéndolos en la consola
        console.log(err);
      }
    }
  }
  
}
