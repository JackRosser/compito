import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { iUser } from '../../../models/i-user';
import { Router } from '@angular/router';
import { CarlocontiService } from '../../../services/carloconti.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

constructor(private authSvc:AuthService, private redirect:Router, private carloSvc:CarlocontiService) {}

form:Partial<iUser> = {}

diavola:boolean = true
diavolaHidden():void {
  this.diavola = !this.diavola
  setTimeout(() => {
    this.diavola = true
  }, 300);
}

messageOfCarlo!:string

registah() {
this.authSvc.register(this.form).subscribe(() => {
this.messageOfCarlo = "Bene, adesso che ti sei registrato loggati e non farmi incazzare"
this.carloSvc.messageFromCarlo(this.messageOfCarlo)
  this.redirect.navigate(['/login'])
})
}

}
