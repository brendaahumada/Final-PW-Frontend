import { Injectable } from '@angular/core';
import { User } from 'src/app/Core/Interfaces/user';
import axios from 'axios'
import { BACKEND_URL } from 'src/app/Core/constant/backend';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = JSON.parse(localStorage.getItem('session') || '{}').token;
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  constructor() { }

   async AddUser(c: User): Promise<User> {
    const user = await axios.post(BACKEND_URL + '/api/User', c, this.config);
    return user.data;
  }


}
