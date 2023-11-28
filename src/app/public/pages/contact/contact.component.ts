// contact.component.ts
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  // newContact: Contact = { name: '', email: '', celularNumber: , location:  };

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.contacts = await this.contactService.getContacts();
    } catch (err) {
      console.log(err);
    }

    console.log(this.contacts);
  }

  // async addContact() {
  //   try {
  //     const result = await this.contactService.AddContact(this.newContact);

  //     if (result) {
  //       console.log('Nuevo contacto agregado:', result);
  //       // Actualiza la lista de contactos después de agregar uno nuevo
  //       this.getData();
  //       // Limpia el objeto newContact para permitir agregar más contactos
  //       this.newContact = {  name: '', email: ''}
  //     } else {
  //       console.error('Error al agregar contacto');
  //     }
  //   } catch (err) {
  //     console.error('Error al agregar contacto:', err);
  //   }
  // }
}
