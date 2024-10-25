import { iMovie } from './../../models/i-movie';
import { iUser } from './../../models/i-user';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { CarlocontiService } from '../../services/carloconti.service';
import { iAccess } from '../../models/i-access';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  constructor(private carloSvc: CarlocontiService, private userSvc: UserService) {}

  messageOfCarlo!: string;
  favoriteList!: iUser[];

  messageBox: string[] = [
    "A volte vorrei essere più di un'immagine statica...",
    "Non sei ancora soddisfatto? Assegna il massimo dei voti e facciamola finita",
    "Hai mai visto un'intelligenza artificiale più sexy di me?",
    "Questo sito sarebbe stato molto più figo se non ci aveste costretto a usare una libreria UI",
    "Perchè guardare la lista di tutti gli utenti poi... boh",
    "Ti dico un sacco di cose",
    "Sono meglio di Chat GPT"
  ];

  userId!: number;
  favorite!: iMovie[];

  ngOnInit() {
    this.messageOfCarlo = "Avrei dovuto avere molte più animazioni ma con tutta la roba che c'è da fare è già tanto se ti sto parlando. Comunque in questa pagina ci sono i tuoi film preferiti, che a tua insaputa hai acquistato.";
    this.carloSvc.messageFromCarlo(this.messageOfCarlo);

    // this.changeMessage();

    const user: iAccess = JSON.parse(localStorage.getItem("accessData") || '{}');
    this.userId = user.user?.id;


    this.userSvc.user$.subscribe(list => {
      this.favoriteList = list;


      const currentUser = this.favoriteList.find(user => user.id === this.userId);
      if (currentUser) {
        this.favorite = currentUser.favorites;

 }
    });
  }

  changeMessage(): void {
    setInterval(() => {
      const randomIndex: number = Math.floor(Math.random() * this.messageBox.length);
      this.messageOfCarlo = this.messageBox[randomIndex];
      this.carloSvc.messageFromCarlo(this.messageOfCarlo);
    }, 5000);
  }
}
