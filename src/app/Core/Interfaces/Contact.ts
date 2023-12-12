import { Location } from "./location";
export interface Contact {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  telephoneNumber: number;
  celularNumber: number ;
  description: string;
  location: Location;
}

export const contactos: Contact[] = [];
