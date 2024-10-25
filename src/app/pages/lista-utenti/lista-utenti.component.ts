import { Component } from '@angular/core';
import { CarlocontiService } from '../../services/carloconti.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrl: './lista-utenti.component.scss'
})
export class ListaUtentiComponent {



constructor(private carloSvc:CarlocontiService, private userSvc:UserService) {}

messageOfCarlo!:string

userList!:iUser[]

ngOnInit() {
  this.messageOfCarlo = "A cosa serve vedere gli altri utenti registrati? Boh"
  this.carloSvc.messageFromCarlo(this.messageOfCarlo)

this.userSvc.user$.subscribe(users => {
  this.userList = users
})

}


}
