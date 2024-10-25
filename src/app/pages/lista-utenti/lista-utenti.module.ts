import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaUtentiRoutingModule } from './lista-utenti-routing.module';
import { ListaUtentiComponent } from './lista-utenti.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListaUtentiComponent
  ],
  imports: [
    CommonModule,
    ListaUtentiRoutingModule,
    SharedModule
  ]
})
export class ListaUtentiModule { }
