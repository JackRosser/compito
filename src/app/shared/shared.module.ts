import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarlocontiComponent } from './carloconti/carloconti.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    CarlocontiComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [CarlocontiComponent]
})
export class SharedModule { }
