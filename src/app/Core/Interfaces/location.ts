import { Contact } from "./Contact";

export interface Location {
    id: number;
    latitude?: number | null;
    longitude?: number | null;
    description?: string;
    contact: Contact
  }
  