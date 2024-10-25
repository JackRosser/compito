import { Component, ViewChild } from '@angular/core';
import { iUser } from '../../../models/i-user';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CarlocontiService } from '../../../services/carloconti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

constructor(private carloSvc:CarlocontiService) {}


@ViewChild('myLogin') form!:NgForm

loginData:iUser = {
  id: 0,
  email: '',
  password: ''
}

ngAfterViewInit():void {
  this.form.form.valueChanges.subscribe()
  this.form.form.statusChanges.subscribe()
}

submitLogin(myLogin:NgForm) {

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

messageOfCarlo:string = "Ciao, sono Carlo Conti, il tuo assistente personale! Per cominciare inserisci i tuoi dati di login, e se non sei già registrato registrati! Tranquillo, la sicurezza è il nostro vanto, la tua password passerà sotto 27 crittazioni e non sarà visibile da nessuno"

nextMessage():void {
  this.messageOfCarlo = "Non sei ancora registrato? Vergognati. Compila subito i dati"
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

ngOnInit() {
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)
}

}
