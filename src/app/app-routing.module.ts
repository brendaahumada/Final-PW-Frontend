import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { ContactComponent } from './public/pages/contact/contact.component';
import { LocationComponent } from './public/pages/location/location.component';
import { SignupComponent } from './public/pages/signup/signup.component';
import { LoginComponent } from './public/pages/login/login.component';
import { AddContactComponent } from './public/components/add-contact/add-contact.component';
import { ContactDetailsComponent } from './public/pages/contact-details/contact-details.component';
import { EditContactComponent } from './public/components/edit-contact/edit-contact.component';
import { LocationDetailsComponent } from './public/pages/location-details/location-details.component';

// Archivo que maneja el ruteo de toda la app o páginas
const routes: Routes = [
{ path: 'location/:id', 
  component: LocationDetailsComponent 
},
{
    path:'contact/:id',
    component :ContactDetailsComponent
},
{
    path: 'edit-contact/:id',
    component: EditContactComponent
},
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
{
    path:"signup",
    component:SignupComponent

},
{
    path:"login",
    component:LoginComponent
}, 
{ path: 'agregar-contacto', 
component: AddContactComponent 
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
