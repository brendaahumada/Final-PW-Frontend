import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { ContactComponent } from './public/pages/contact/contact.component';
import { LocationComponent } from './public/pages/location/location.component';
import { SignupComponent } from './public/pages/signup/signup.component';
import { LoginComponent } from './public/pages/login/login.component';

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
  {
    path:"signup",
    component:SignupComponent

  },
  {
    path:"login",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
