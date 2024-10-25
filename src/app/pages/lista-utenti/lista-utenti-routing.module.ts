import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUtentiComponent } from './lista-utenti.component';

const routes: Routes = [{ path: '', component: ListaUtentiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaUtentiRoutingModule { }
