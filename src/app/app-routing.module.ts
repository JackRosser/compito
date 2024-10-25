import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'', redirectTo: 'login', pathMatch: 'full'}, { path: 'login', loadChildren: () => import('./auth/pages/login/login.module').then(m => m.LoginModule) }, { path: 'register', loadChildren: () => import('./auth/pages/register/register.module').then(m => m.RegisterModule) }, { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule) }, { path: 'lista-utenti', loadChildren: () => import('./pages/lista-utenti/lista-utenti.module').then(m => m.ListaUtentiModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
