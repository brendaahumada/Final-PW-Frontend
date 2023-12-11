import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contacto: Contact | undefined;
  isEditing: boolean = false;

  showDeleteConfirmation = false;
  deletingConfirmed = false;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {}

  ngOnInit(): void {
    const contactoId = +this.route.snapshot.params['id'];
    this.contactService.getContactDetails(contactoId).then((contacto) => {
      this.contacto = contacto;
    });
  }

  // Función para mostrar el modal de confirmación
  deleteContact() {
    console.log('Botón de eliminar contacto presionado');
    this.deletingConfirmed = true;
    this.showDeleteConfirmation = true;
  }

  // Función para cancelar la eliminación
  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.deletingConfirmed = false;
  }

  // Función para confirmar y realizar la eliminación
  confirmDelete() {
    if (this.deletingConfirmed) {
      if (this.contacto && typeof this.contacto.id === 'number') {
        const contactId: number = this.contacto.id;
  
        this.contactService.deleteContact(contactId)
          .then(success => {
            if (success) {
              console.log('Contacto eliminado correctamente.');
              // Puedes realizar alguna acción adicional después de eliminar el contacto, si es necesario.
            } else {
              console.error('Error al intentar eliminar el contacto.');
            }
          })
          .catch(error => {
            console.error('Error al intentar eliminar el contacto:', error);
          })
          .finally(() => {
            this.showDeleteConfirmation = false;
            this.deletingConfirmed = false;
          });
      } else {
        console.error('El contacto o su ID no son válidos.');
      }
    } else {
      this.showDeleteConfirmation = false;
    }
  }
  

  startEditing() {
    // Activa el modo de edición
    this.isEditing = true;
  }

  cancelEditing() {
    // Cancela la edición y vuelve a cargar los detalles originales
    this.isEditing = false;
    this.ngOnInit(); // Recarga los detalles originales
  }

  async saveChanges() {
    // Guarda los cambios utilizando el servicio ContactService
    try {
      const success = await this.contactService.editContact(this.contacto!);
      if (success) {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        this.isEditing = false; // Desactiva el modo de edición
      } else {
        // Maneja el caso en que la edición no fue exitosa.
      }
    } catch (error) {
      console.error(error);
      // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario.
    }
  }
}
