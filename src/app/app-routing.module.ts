import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { Prueba1Component } from './components/pages/prueba1/prueba1.component';
import { Prueba2Component } from './components/pages/prueba2/prueba2.component';
import { Prueba3Component } from './components/pages/prueba3/prueba3.component';
import { ConocemeComponent } from './components/pages/conoceme/conoceme.component';
import { ProyectosComponent } from './components/pages/proyectos/proyectos.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';

const routes: Routes = [
  {path:'', component: HomeComponent, title: 'I/L'},
  {path:'conoceme', component: ConocemeComponent, title: 'I/L'},
  {path:'proyectos', component: ProyectosComponent, title: 'I/L'},
  {path:'contacto', component: ContactoComponent, title: 'I/L'},
  {path:'prueba1', component: Prueba1Component, title: 'I/L'},
  {path:'prueba2', component: Prueba2Component, title: 'I/L'},
  {path:'prueba3', component: Prueba3Component, title: 'I/L'},
  {path:'**', component:HomeComponent, title: 'I/L'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
