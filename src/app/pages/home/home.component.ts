import { Component, OnInit, OnDestroy } from '@angular/core';
import { iMovie } from '../../models/i-movie';
import { MoviesService } from '../../services/movies.service';
import { CarlocontiService } from '../../services/carloconti.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../models/i-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  listOfFilms!: iMovie[];
  user!: iUser;
  messageOfCarlo: string = "Qua trovi tutti i film. Le cards sono tristi e anonime perchè non c'era tempo. Per lo stesso motivo, io non sono responsive. Guarda questo sito con uno schermo grande per non farmi fare brutta figura. Se vedi i Like sormontati è perché il mio creatore ha fatto casino con gli z-index.";

  private subscriptions: Subscription[] = [];

  constructor(
    private movieSv: MoviesService,
    private carloSvc: CarlocontiService,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    const accessData = JSON.parse(localStorage.getItem("accessData") || '{}');
    const userId = accessData.user?.id;



    const carloSubscription = this.carloSvc.carloMsg$.subscribe(message => {
      this.carloSvc.messageFromCarlo(this.messageOfCarlo);
    });
    this.subscriptions.push(carloSubscription);

    if (userId) {
      const userSubscription = this.userSvc.user$.subscribe(users => {
        this.user = users.find(u => u.id === userId)!;
      });
      this.subscriptions.push(userSubscription);
    }

    const movieSubscription = this.movieSv.movie$.subscribe(list => {
      this.listOfFilms = list;
    });
    this.subscriptions.push(movieSubscription);
  }

  message(movie: iMovie) {
    switch (movie.genere) {
      case "Drama":
        this.messageOfCarlo = "Un Drama eh? Che persona noiosa";
        break;
      case "Action":
        this.messageOfCarlo = "Se ti piace così tanto l'azione allora vai in guerra";
        break;
      case "Sci-Fi":
        this.messageOfCarlo = "Il genere Sci-Fi mi fa schifo";
        break;
      case "Fantasy":
        this.messageOfCarlo = "Non sei stufo di tutti questi maghi e magie? Torna con i piedi per terra!";
        break;
      case "Thriller":
        this.messageOfCarlo = "Non fa così paura come si dice";
        break;
      case "Western":
        this.messageOfCarlo = "I western non vanno più di moda";
        break;
      case "Crime":
        this.messageOfCarlo = "Ho avvisato la polizia che ti piace questo genere di film";
        break;
      case "War":
        this.messageOfCarlo = "Adoro l'odore del napalm al mattino";
        break;
      case "Mystery":
        this.messageOfCarlo = "Film banale come la tua giornata";
        break;
      case "Biography":
        this.messageOfCarlo = "Ti piacerebbe eh?";
        break;
      case "Horror":
        this.messageOfCarlo = "Non fanno più gli horror di una volta";
        break;
      case "History":
        this.messageOfCarlo = "Ma vatti a guardare un documentario";
        break;
      default:
        this.messageOfCarlo = "Genere non riconosciuto";
    }
    this.carloSvc.messageFromCarlo(this.messageOfCarlo);
  }

  addMovie(movie: iMovie) {
    if (this.user) {
      this.userSvc.insertFavorite(movie, this.user);
    }
    this.message(movie);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
