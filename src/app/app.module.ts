import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { Prueba1Component } from './components/pages/prueba1/prueba1.component';
import { Prueba2Component } from './components/pages/prueba2/prueba2.component';
import { Prueba3Component } from './components/pages/prueba3/prueba3.component';
import { ConocemeComponent } from './components/pages/conoceme/conoceme.component';
import { ProyectosComponent } from './components/pages/proyectos/proyectos.component';
import { PreLoaderComponent } from './components/shared/pre-loader/pre-loader.component';
import { IconosTecnoComponent } from './components/shared/iconos-tecno/iconos-tecno.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    Prueba1Component,
    Prueba2Component,
    Prueba3Component,
    ConocemeComponent,
    ProyectosComponent,
    PreLoaderComponent,
    IconosTecnoComponent,
    ContactoComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
