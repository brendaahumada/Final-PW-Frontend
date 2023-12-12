import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { Location as MyLocation } from 'src/app/Core/Interfaces/location'; // Cambiar el nombre a "MyLocation" o algo diferente
import { Contact } from 'src/app/Core/Interfaces/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  constructor(private location: LocationService, private router: Router, private contactService:ContactService) {}

  Contacts: Contact[] = [];
  Location: MyLocation[] = []; // Cambiado el nombre a "MyLocation"

  ngOnInit(): void {
    this.getContactData(); // Llamar a la función que obtiene datos de contactos antes de ubicaciones
  }

  async getContactData() {
    try {
      // Supongamos que obtienes la lista de contactos de algún servicio
      this.Contacts = await this.contactService.getContacts();
      
      // Luego de obtener la lista de contactos, procedes a obtener las ubicaciones
      this.getLocationData();
    } catch (error) {
      console.error(error);
    }
  }

  async getLocationData() {
    try {
      // Obtener los IDs de ubicación asociados a los contactos del usuario actual
      const ubicacionIds = this.Contacts.map((contact) => contact.location.id);

      // Filtrar las ubicaciones basadas en los IDs asociados a los contactos del usuario actual
      this.Location = await this.location.getLocations().then((ubicaciones) => {
        return ubicaciones.filter((ubicacion) => ubicacionIds.includes(ubicacion.id));
      });

      console.log(this.Location);
    } catch (error) {
      console.error(error);
    }
  }

  verDetalles(Location: MyLocation) {
    // Navegar a la página de detalles del contacto
    this.router.navigate(['/location', Location.id]);
  }
}
