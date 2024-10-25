import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUtentiRoutingModule } from './lista-utenti-routing.module';
import { ListaUtentiComponent } from './lista-utenti.component';


@NgModule({
  declarations: [
    ListaUtentiComponent
  ],
  imports: [
    CommonModule,
    ListaUtentiRoutingModule
  ]
})
export class ListaUtentiModule { }
