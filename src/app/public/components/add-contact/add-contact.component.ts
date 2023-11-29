// add-contact.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/Core/Interfaces/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  @Output() addContact = new EventEmitter<Contact>();
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

  // Lógica para agregar un nuevo contacto
  onSubmit(): void {
    // Verifica si los campos requeridos están llenos
    if (this.newContact.name && this.newContact.email) {
      // Emitir el evento para agregar el nuevo contacto
      this.addContact.emit(this.newContact);

      // Limpia los datos del nuevo contacto después de agregarlo
      this.clearNewContact();
    } else {
      // Puedes manejar aquí el caso en el que los campos requeridos no estén llenos
      console.error('Nombre y correo electrónico son campos obligatorios');
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
