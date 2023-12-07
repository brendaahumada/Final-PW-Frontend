import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  nuevoContacto: any = {
    location: {}  // Corrección: utiliza "=" para asignar un objeto vacío
  };

  constructor(private contactService: ContactService, private router: Router) {}

  async agregarContacto() {
    try {
      // Lógica para enviar el nuevo contacto al backend
      const nuevoContactoAgregado = await this.contactService.addContact(this.nuevoContacto);
      
      // Puedes manejar la respuesta del servidor aquí
      console.log('Nuevo contacto agregado:', nuevoContactoAgregado);

      // Limpiar el formulario o hacer otras acciones necesarias
      this.nuevoContacto = {};

      // Redirigir a la página de contactos después de agregar el contacto
      this.router.navigate(['/contact']);
    } catch (error) {
      console.error('Error al agregar el contacto', error);
    }
  }
}
