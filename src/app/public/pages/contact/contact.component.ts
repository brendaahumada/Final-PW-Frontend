// add-contact.component.ts

import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
 })
export class ContactComponent  {
  constructor( private auth:AuthService, private us:ContactService, private router: Router) { }
  contactos: Contact[] = [];


  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.contactos = await this.us.getContacts();
    console.log(this.contactos);
  }
  logOut(){
    this.auth.resetSession();

  }
  verDetalles(contacto: Contact) {
    // Navegar a la página de detalles del contacto
    this.router.navigate(['/contact', contacto.id]);
  }
  
  agregarContacto() {
    // Navegar a la página "agregar-contacto"
    this.router.navigate(['/agregar-contacto']);
  }

}
