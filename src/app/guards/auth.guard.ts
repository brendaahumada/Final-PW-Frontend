// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Usuario autenticado, mostrar mensaje y redirigir a otra página
      alert('Ya estás autenticado. No puedes acceder a la página de inicio de sesión.');
      this.router.navigate(['/contact']);
      return false;
    }
    return true;
  }
}
