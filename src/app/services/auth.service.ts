import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private isAuthenticated: boolean = false;

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Método para simular el inicio de sesión
  login(username: string, password: string): boolean {
    // Lógica de autenticación (puedes implementarla de acuerdo a tus necesidades)
    if (username === 'usuario' && password === 'contrasena') {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  // Método para simular el cierre de sesión
  logout(): void {
    this.isAuthenticated = false;
  }
}
