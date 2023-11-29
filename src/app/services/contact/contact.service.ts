// contacts.service.ts
import { Injectable } from '@angular/core';
// import { Contact, Location } from './contact.model';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { Location } from 'src/app/Core/Interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts: Contact[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      telephoneNumber: 1234567890,
      celularNumber: 9876543210,
      description: 'Friend',
      avatar: 'john-avatar.jpg',
      location: {
        id: 1,
        latitude: 40.7128,
        longitude: -74.0060,
        description: 'New York City',
      },
    },
    // Add more contacts as needed
  ];

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(newContact: Contact): void {
    // Set id to null if not provided
    newContact.id = newContact.id || null;
    this.contacts.push(newContact);
  }

  deleteContact(contactId: number): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
  }
  updateContact(contactId: number, updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...updatedContact };
    }
  }
  
}
