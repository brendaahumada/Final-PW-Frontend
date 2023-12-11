import { Injectable } from '@angular/core';
import { BACKEND_URL } from 'src/app/Core/constant/backend';
import { AuthService } from '../auth/auth.service';
import { Location } from 'src/app/Core/Interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private auth:AuthService) { }


  async getLocationById(locationId: number): Promise<Location> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/Location/${locationId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.auth.getSession().token!}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data as Location;
    } catch (error) {
      console.error(`Error fetching location with ID ${locationId}:`, error);
      throw error;
    }
  }
  


  async getLocations(): Promise<Location[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/Location`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.auth.getSession().token!}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data as Location[];
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }
  
}
