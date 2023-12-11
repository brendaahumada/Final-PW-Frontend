import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { Location as MyLocation } from 'src/app/Core/Interfaces/location'; // Cambiar el nombre a "MyLocation" o algo diferente
import { Contact } from 'src/app/Core/Interfaces/Contact';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  constructor(private location: LocationService, private router: Router) {}
  Contact : Contact [] = []
  Location: MyLocation[] = []; // Cambiado el nombre a "MyLocation"

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.Location = await this.location.getLocations();
    console.log(this.Location);
  }

  verDetalles(Location: MyLocation) {
    // Navegar a la página de detalles del contacto
    this.router.navigate(['/location', Location.id]);
  }
}
