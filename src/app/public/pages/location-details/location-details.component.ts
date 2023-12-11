import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/Core/Interfaces/location';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {
  lo: Location | undefined;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    const locationId = +this.route.snapshot.params['id'];
    this.locationService.getLocationById(locationId).then((location) => {
      this.lo = location;
    });
  }
}
