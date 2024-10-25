import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { GuestGuard } from '../../../guards/guest.guard';

const routes: Routes = [{ path: '', component: RegisterComponent, canActivate: [GuestGuard], title:"register" }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
