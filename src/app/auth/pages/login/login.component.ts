import { Component, ViewChild } from '@angular/core';
import { iUser } from '../../../models/i-user';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CarlocontiService } from '../../../services/carloconti.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

constructor(private carloSvc:CarlocontiService, private authSvc:AuthService, private redirect:Router) {}

messageOfCarlo:string = "Ciao, sono Carlo Conti, il tuo assistente personale! Per cominciare inserisci i tuoi dati di login, e se non sei già registrato registrati! Tranquillo, la sicurezza è il nostro vanto, la tua password passerà sotto 27 crittazioni e non sarà visibile da nessuno"

@ViewChild('myLogin') form!:NgForm

loginData:iUser = {
  id: 0,
  email: '',
  password: '',
  nome: '',
  secondonome: '',
  cognome: '',
  voto: false,
  hobby: '',
  pizza: '',
  favorites: []
}

ngAfterViewInit():void {
  this.form.form.valueChanges.subscribe()
  this.form.form.statusChanges.subscribe()
}

submitLogin() {
  this.authSvc.login(this.form.value).subscribe(data => {
    this.messageOfCarlo = "Qua trovi tutti i film. Le cards sono tristi e anonime perchè non c'era tempo. Per lo stesso motivo, io non sono responsive. Guarda questo sito con uno schermo grande per non farmi fare brutta figura."
    this.redirect.navigate(['/home']);
  });
}


carloToggle:boolean = false

seriously() {
  if(this.form.form.value.password != "") {
    this.carloToggle = true
  } else {
    this.carloToggle = false
  }

  this.carloSvc.trollOn(this.carloToggle)

}



nextMessage():void {
  this.messageOfCarlo = "Non sei ancora registrato? Vergognati. Compila subito i dati"
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

ngOnInit() {
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

}
