// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './public/pages/contact/contact.component';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './public/components/tabs/tabs.component';
import { LoginComponent } from './public/pages/login/login.component';
import { SignupComponent } from './public/pages/signup/signup.component';
import { AddContactComponent } from './public/components/add-contact/add-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
