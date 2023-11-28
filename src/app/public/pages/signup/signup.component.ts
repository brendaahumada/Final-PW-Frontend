import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { iAuthRequest } from 'src/app/Core/Interfaces/auth';
import { User } from 'src/app/Core/Interfaces/user';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router'; // Añadido para usar el servicio Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router // Añadido para inyectar el servicio Router
  ) {}

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
  }

  async registrarse(form: NgForm) {
    console.log('Valid form: ', form.valid);
    if (form.valid) {
      // Crear un nuevo objeto User con los datos del formulario
      const newUser: User = {
        name: this.authData.name,
        lastName: this.authData.lastName,
        email: this.authData.email,
        password: this.authData.password,
      };

      try {
        // Llamar al servicio para agregar un nuevo usuario
        const res = await this.userService.AddUser(newUser);
        console.log(res);

        // Iniciar sesión después de registrar al nuevo usuario
        this.authService.login({
          email: this.authData.email,
          password: this.authData.password,
        });

        // Navegar a la ruta '/contacts' después de iniciar sesión
        this.router.navigate(['/contacts']);
      } catch (err) {
        // Manejar errores en caso de que la llamada al servicio falle
        console.log(err);
      }
    }
  }
}
