// contacts.service.ts
import { Injectable } from '@angular/core';

import { Contact } from 'src/app/Core/Interfaces/Contact';
import { Location } from 'src/app/Core/Interfaces/location';
import { AuthService } from '../auth/auth.service';
import { BACKEND_URL } from 'src/app/Core/constant/backend';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private auth:AuthService) {}

  async getContactDetails(id: number): Promise<Contact> {
    const data = await fetch(BACKEND_URL+'/api/Contact/'+ id,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization' :  `Bearer ${this.auth.getSession().token!}` ////******************* */
      },
    });
    return await data.json();
  }

  async getContacts(): Promise<Contact[]> {
    const data = await fetch(BACKEND_URL+'/api/Contact',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization' :  `Bearer ${this.auth.getSession().token!}`
      },
    });
    return await data.json();
  }

  async editContact(contact: Contact): Promise<boolean>  {
    console.log('Enviando edit de usuario a la api');
    const res = await fetch(BACKEND_URL+'/api/Contact/'+ (contact.id), {
      method: 'PUT',
      body: JSON.stringify(contact),
      headers: {
        'Content-type': 'application/json',
        'Authorization' :  `Bearer ${this.auth.getSession().token!}`
      },
    });
    return res.ok;
  }

  async addContact(contact: Contact){
    console.log('Enviando edit de usuario a la api');
    const res = await fetch(BACKEND_URL+'/api/Contact', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization' :  `Bearer ${this.auth.getSession().token!}`
      },
      body: JSON.stringify(contact),
    });
    return await res.json();
  }

  async deleteContact(id:number):Promise<boolean>{
    const res = await fetch(BACKEND_URL+'/api/Contact/'+id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization' :  `Bearer ${this.auth.getSession().token!}`
      },
    });
    return res.ok;
  }
  
}
