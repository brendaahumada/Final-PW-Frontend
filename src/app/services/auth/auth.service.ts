import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iAuthRequest } from 'src/app/Core/Interfaces/auth';
import { BACKEND_URL } from 'src/app/Core/constant/backend';
import { ISession } from 'src/app/Core/Interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  private apiUrl = BACKEND_URL + '/api/Authentication'; // Ajusta según tu estructura de rutas

  constructor(private http: HttpClient) {}

  async login(authentication: iAuthRequest): Promise<boolean> {
    const res = await fetch(BACKEND_URL + '/api/Authentication/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    if (!res.ok) return false;
    const token = await res.text();
    console.log('Login token:', token);
    if (!token) return false;
    this.setSession(token);
    // this.loggedIn = true;
    return true;
  }
  setSession(token: any, expiresTimeHours: number = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };

    localStorage.setItem('session', JSON.stringify(session));
  }
  async register(authentication: iAuthRequest): Promise<boolean> {
    const res = await fetch(BACKEND_URL + '/api/Authentication/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    if (!res.ok) return false;
    const token = await res.text();
    console.log(token);
    if (!token) return false;
    this.setSession(token);
    this.loggedIn = true;
    return true;
  }
  
}
