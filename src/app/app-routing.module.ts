import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { Prueba1Component } from './components/pages/prueba1/prueba1.component';
import { Prueba2Component } from './components/pages/prueba2/prueba2.component';
import { Prueba3Component } from './components/pages/prueba3/prueba3.component';
import { ConocemeComponent } from './components/pages/conoceme/conoceme.component';

const routes: Routes = [
  {path:'', component: HomeComponent, title: 'Luky'},
  {path:'conoceme', component: ConocemeComponent, title: 'Luky'},
  {path:'prueba1', component: Prueba1Component, title: 'Luky'},
  {path:'prueba2', component: Prueba2Component, title: 'Luky'},
  {path:'prueba3', component: Prueba3Component, title: 'Luky'},
  {path:'**', component:HomeComponent, title: 'Luky'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
