import { Component } from '@angular/core';
import { CarlocontiService } from '../../services/carloconti.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

constructor(private carloSvc:CarlocontiService) {}


messageOfCarlo!:string

user!: string

navOver() {
  this.messageOfCarlo = "Ti vedo che stai andando a vedere se il mio creatore ha fatto tutte le funzionalità richieste, e vergognati per averne dubitato"
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

navLeave() {
  this.messageOfCarlo = "E adesso sei uscito per vedere se succedeva qualcosa"
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

ngOnInit() {

  let userObj = this.user = JSON.parse(localStorage.getItem("accessData") || '{}');
this.user = userObj.user.nome

}


}
