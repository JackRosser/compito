import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { iUser } from '../../../models/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

constructor(private authSvc:AuthService, private redirect:Router) {}

form:Partial<iUser> = {}

diavola:boolean = true
diavolaHidden():void {
  this.diavola = !this.diavola
  setTimeout(() => {
    this.diavola = true
  }, 300);
}

registah() {
this.authSvc.register(this.form).subscribe(() => {

  this.redirect.navigate(['/home'])
})
}

}
