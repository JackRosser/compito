import { Component } from '@angular/core';
import { CarlocontiService } from '../../services/carloconti.service';
import { iUser } from '../../models/i-user';
import { iMovie } from '../../models/i-movie';
import { iAccess } from '../../models/i-access';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private carloSvc: CarlocontiService, private userSvc: UserService, private authSvc:AuthService) {}

  userId!: number;
  favorite!: iMovie[];
  badge!: number;
  messageOfCarlo!: string;
  user!: string;
  favoriteList!: iUser[];


  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  carloMessage!:string

logout() {
  this.authSvc.logout()
  this.carloMessage = "E così hai provato il logout. Funziona eh? E' stato difficile farlo, apprezzalo!"
  this.carloSvc.messageFromCarlo(this.carloMessage)
}

  ngOnInit() {

    const userObj: iAccess = JSON.parse(localStorage.getItem("accessData") || '{}');
    this.user = this.capitalize(userObj.user?.nome || '');

    this.userId = userObj.user?.id;


    this.userSvc.user$.subscribe(list => {
      this.favoriteList = list;

      const currentUser = this.favoriteList.find(user => user.id === this.userId);
      if (currentUser) {
        this.favorite = currentUser.favorites;
        this.badge = this.favorite.length
      }
    });
  }
}
