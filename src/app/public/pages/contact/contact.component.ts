// contact.component.ts
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactsService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  showAddForm = false;
  newContact: Contact = {
    name: '',
    lastName: '',
    email: '',
    celularNumber: null,
    location: {
      id: null,
      latitude: null,
      longitude: null,
      description: 'Unknown',
    },
  };

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    // Obtener los contactos desde localStorage al iniciar la aplicación
    const savedContacts = localStorage.getItem('contacts');
    this.contacts = savedContacts ? JSON.parse(savedContacts) : [];
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    // Limpia los datos del nuevo contacto al alternar la visibilidad del formulario
    if (!this.showAddForm) {
      this.clearNewContact();
    }
  }

  addContactFromForm(): void {
    // Lógica para agregar el nuevo contacto al servicio
    this.contactsService.addContact(this.newContact);
  
    // Actualiza la lista de contactos después de agregar un nuevo contacto
    this.contacts = this.contactsService.getContacts();
  
    // Limpia los datos del nuevo contacto después de agregarlo
    this.clearNewContact();
  
    // Oculta el formulario después de agregar el contacto
    this.showAddForm = false;
  }

  editContact(index: number): void {
    // Buscar el contacto a editar usando el índice
    const contactToEdit = this.contacts[index];
  
    // Verificar si se encontró el contacto
    if (contactToEdit) {
      // Asignar los datos del contacto al formulario de nuevo contacto
      this.newContact = { ...contactToEdit };
  
      // Mostrar el formulario de agregar/editar
      this.showAddForm = true;
    }
  }
  
  clearNewContact(): void {
    this.newContact = {
      name: '',
      lastName: '',
      email: '',
      celularNumber: null,
      location: {
        id: null,
        latitude: null,
        longitude: null,
        description: 'Unknown',
      },
    };
  }
}
