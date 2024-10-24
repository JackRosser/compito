import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarlocontiComponent } from './carloconti/carloconti.component';



@NgModule({
  declarations: [
    CarlocontiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CarlocontiComponent]
})
export class SharedModule { }
