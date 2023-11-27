import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { ContactComponent } from './public/pages/contact/contact.component';
import { LocationComponent } from './public/pages/location/location.component';

// Archivo que maneja el ruteo de toda la app o páginas
const routes: Routes = [
  {
    path: "",
    component:HomeComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "location",
    component:LocationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
