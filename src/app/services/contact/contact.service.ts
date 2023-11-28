import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { BACKEND_URL } from 'src/app/Core/constant/backend';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  token = JSON.parse(localStorage.getItem('session') || '{}').token;
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  constructor(private router: Router) {}

  async getUserDetails(id: number) {
    console.log('ok');
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await axios.get(BACKEND_URL + '/api/contact', this.config);
    return contacts.data;
  }

  async getContact(id: number): Promise<Contact> {
    const contact = await axios.get(
      BACKEND_URL + '/api/contact/' + id,
      this.config
    );
    console.log(contact.data);
    return contact.data;
  }

  async deleteContact(id: number): Promise<boolean> {
    const res = await axios.delete(
      BACKEND_URL + '/api/contact/' + id,
      this.config
    );
    return res.status == 200;
  }

  async updateContact(id: number, c: Contact): Promise<Contact> {
    const res = await axios.put(
      BACKEND_URL + '/api/contact/' + id,
      c,
      this.config
    );
    return res.data;
  }

  async AddContact(c: Contact): Promise<Contact> {
    const contact = await axios.post(
      BACKEND_URL + '/api/contact',
      c,
      this.config
    );
    return contact.data;
  }

}
