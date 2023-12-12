// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { TabsComponent } from './public/components/tabs/tabs.component';
import { LoginComponent } from './public/pages/login/login.component';
import { SignupComponent } from './public/pages/signup/signup.component';
import { AddContactComponent } from './public/components/add-contact/add-contact.component';
import { ContactComponent } from './public/pages/contact/contact.component';
import { ContactDetailsComponent } from './public/pages/contact-details/contact-details.component';
import { LocationComponent } from './public/pages/location/location.component';
import { LocationDetailsComponent } from './public/pages/location-details/location-details.component';
import { HomeComponent } from './public/pages/home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    LocationComponent,
    AppComponent,
    TabsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    AddContactComponent,
    ContactDetailsComponent,
    LocationDetailsComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
