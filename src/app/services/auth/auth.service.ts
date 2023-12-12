import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iAuthRequest } from 'src/app/Core/Interfaces/auth';
import { BACKEND_URL } from 'src/app/Core/constant/backend';
import { ISession } from 'src/app/Core/Interfaces/session';
import { Router } from '@angular/router';
import { Contact } from 'src/app/Core/Interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = BACKEND_URL + '/api/Authentication';
  private hasRegisteredFlag: boolean = false;
  private userContacts: Contact[] = [];  // Asumiendo que tienes una interfaz Contact


  
  constructor(private http: HttpClient, private router: Router) {}

  hasRegistered(): boolean {
    return this.hasRegisteredFlag;
  }

  setHasRegistered(value: boolean): void {
    this.hasRegisteredFlag = value;
  }


  

  async login(authentication: iAuthRequest): Promise<boolean> {
    const res = await fetch(BACKEND_URL + '/api/Authentication/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    
    if (!res.ok) return false;

    const token = await res.text();

    if (!token) return false;

    this.setSession(token);
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

    if (!token) return false;

    this.setSession(token);
    return true;
  } 

  isAuthenticated(): boolean {
    const session: ISession = this.getSession();
    const now = new Date().toISOString();
  
    if (session && session.token && session.expiresIn) {
      return session.expiresIn > now;
    }
  
    return false;
  }
  
  getSession(): ISession {
    const item: string = localStorage.getItem('session') || 'invalid';
    if (item !== 'invalid') {
      return JSON.parse(item);
    }
    return { expiresIn: '', token: '' };
  }

  resetSession() {
    localStorage.removeItem('session');
    this.router.navigate(['/']);
  }
}
