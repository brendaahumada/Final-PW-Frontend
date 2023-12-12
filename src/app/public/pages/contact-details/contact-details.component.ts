// Importar los módulos y componentes necesarios
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import * as Toastify from 'toastify-js'; // Importar la librería Toastify para mostrar mensajes emergentes

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contacto: Contact | undefined; // Almacenar detalles del contacto
  isEditing: boolean = false; // Indicar si se está editando el contacto
  showToast: boolean = false; // Mostrar/ocultar mensajes emergentes
  toastMessage: string = ''; // Mensaje a mostrar en el mensaje emergente
  mostrarModal: boolean = false; // Mostrar/ocultar un modal para confirmar la eliminación del contacto

  // Constructor para inyectar servicios y componentes
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private r: Router
  ) {}

  // Hook de ciclo de vida: se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el ID del contacto desde los parámetros de la ruta
    const contactoId = +this.route.snapshot.params['id'];

    // Obtener los detalles del contacto usando ContactService
    this.contactService.getContactDetails(contactoId).then((contacto) => {
      this.contacto = contacto; // Actualizar los detalles del contacto
    });
  }

  // Método para habilitar el modo de edición
  startEditing() {
    this.isEditing = true;
  }

  // Método para cancelar la edición y volver a inicializar el componente
  cancelEditing() {
    this.isEditing = false;
    this.ngOnInit(); // Volver a inicializar el componente con los datos originales
  }

  // Método para guardar los cambios realizados al contacto
  async saveChanges() {
    try {
      // Intentar editar el contacto usando ContactService
      const success = await this.contactService.editContact(this.contacto!);

      if (success) {
        this.isEditing = false; // Deshabilitar el modo de edición
        this.r.navigateByUrl('/contact'); // Navegar de regreso a la lista de contactos
      } else {
        // Mostrar un mensaje emergente de error si la edición falla
        this.showToastMessage('Error al editar el contacto', 'error');
      }
    } catch (error) {
      console.error(error);
      this.showToastMessage('Error al editar el contacto', 'error');
    }
  }

  // Método para mostrar el modal de confirmación de eliminación del contacto
  mostrarModalEliminar() {
    this.mostrarModal = true;
  }

  // Método para ocultar el modal de confirmación de eliminación del contacto
  ocultarModal() {
    this.mostrarModal = false;
  }

  // Método para eliminar el contacto
  async eliminarContacto() {
    this.ocultarModal(); // Ocultar el modal de confirmación de eliminación

    try {
      // Verificar si el contacto existe y tiene un ID válido
      if (this.contacto && this.contacto.id !== undefined) {
        // Intentar eliminar el contacto usando ContactService
        const success = await this.contactService.deleteContact(
          this.contacto.id
        );

        if (success) {
          // Mostrar un mensaje emergente de éxito y navegar de regreso a la lista de contactos
          this.showToastMessage('Contacto Eliminado Correctamente', 'success');

          setTimeout(() => {
            this.r.navigateByUrl('/contact');
          }, 5000); // Redirigir después de un retraso de 5000 milisegundos (5 segundos)
        } else {
          // Mostrar un mensaje emergente de error si la eliminación falla
          this.showToastMessage('Error al eliminar el contacto', 'error');
        }
      } else {
        // Registrar un error si falta el contacto o tiene un ID indefinido
        console.error('No hay contacto para eliminar o el ID es undefined');
        this.showToastMessage('Error al eliminar el contacto', 'error');
      }
    } catch (error) {
      console.error(error);
      this.showToastMessage('Error al eliminar el contacto', 'error');
    }
  }

  // Método privado para mostrar mensajes emergentes
  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message; // Establecer el mensaje para el mensaje emergente
    this.showToast = true; // Mostrar el mensaje emergente

    // Utilizar Toastify para mostrar el mensaje emergente con la configuración especificada
    Toastify({
      text: message,
      duration: 3000, // Mostrar durante 3000 milisegundos (3 segundos)
      close: true,
      gravity: 'top',
      position: 'center',
      backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
      stopOnFocus: true,
      onClick: () => {
        this.showToast = false; // Ocultar el mensaje emergente al hacer clic
      },
    }).showToast(); // Invocar el método showToast para mostrar el mensaje emergente
  }
}
