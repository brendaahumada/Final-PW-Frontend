// contact-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contacto: Contact | undefined;
  isEditing: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  mostrarModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private r: Router
  ) {}

  ngOnInit(): void {
    const contactoId = +this.route.snapshot.params['id'];
    this.contactService.getContactDetails(contactoId).then((contacto) => {
      this.contacto = contacto;
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.ngOnInit();
  }

  async saveChanges() {
    try {
      const success = await this.contactService.editContact(this.contacto!);

      if (success) {
        this.isEditing = false;
        this.r.navigateByUrl('/contact/' + this.contacto!.id);
      } else {
        this.showToastMessage('Error al editar el contacto', 'error');
      }
    } catch (error) {
      console.error(error);
      this.showToastMessage('Error al editar el contacto', 'error');
    }
  }

  mostrarModalEliminar() {
    this.mostrarModal = true;
  }

  ocultarModal() {
    this.mostrarModal = false;
  }

  async eliminarContacto() {
    this.ocultarModal();

    try {
      if (this.contacto && this.contacto.id !== undefined) {
        const success = await this.contactService.deleteContact(
          this.contacto.id
        );

        if (success) {
          this.showToastMessage(
            'Contacto eliminado correctamente',
            'success'
          );

          setTimeout(() => {
            this.r.navigateByUrl('/contact');
          }, 5000);
        } else {
          this.showToastMessage('Error al eliminar el contacto', 'error');
        }
      } else {
        console.error('No hay contacto para eliminar o el ID es undefined');
        this.showToastMessage('Error al eliminar el contacto', 'error');
      }
    } catch (error) {
      console.error(error);
      this.showToastMessage('Error al eliminar el contacto', 'error');
    }
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.showToast = true;

    Toastify({
      text: message,
      duration: 5000,
      close: true,
      gravity: 'top',
      position: 'center',
      backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
      stopOnFocus: true,
      onClick: () => {
        this.showToast = false;
      },
    }).showToast();
  }
}
