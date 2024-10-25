import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../models/i-movie';
import { MoviesService } from '../../services/movies.service';
import { CarlocontiService } from '../../services/carloconti.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listOfFilms!: iMovie[];
  user!: iUser;
  messageOfCarlo!: string;

  constructor(
    private movieSv: MoviesService,
    private carloSvc: CarlocontiService,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    const accessData = JSON.parse(localStorage.getItem("accessData") || '{}');
    const userId = accessData.user?.id;

    if (userId) {
      this.userSvc.user$.subscribe(users => {
        this.user = users.find(u => u.id === userId)!;
      });
    } else {
    }

    this.movieSv.movie$.subscribe(list => {
      this.listOfFilms = list;
    });
  }

message(movie:iMovie) {
if(movie.genere === "Drama") {
  this.messageOfCarlo = "Un Drama eh? Che persona noiosa"
}
if(movie.genere === "Action") {
  this.messageOfCarlo = "Se ti piace così tanto l'azione allora vai in guerra"
}
if(movie.genere === "Action") {
  this.messageOfCarlo = "Se ti piace così tanto l'azione allora vai in guerra"
}
if(movie.genere === "Sci-Fi") {
  this.messageOfCarlo = "Il genere Sci-Fi mi fa schifo"
}
if(movie.genere === "Fantasy") {
  this.messageOfCarlo = "Non sei stufo di tutti questi maghi e magie? Torna con i piedi per terra!"
}
if(movie.genere === "Thriller") {
  this.messageOfCarlo = "Non fa così paura come si dice"
}
if(movie.genere === "Western") {
  this.messageOfCarlo = "I western non vanno più di moda"
}
if(movie.genere === "Crime") {
  this.messageOfCarlo = "Ho avvisato la polizia che ti piace questo genere di film"
}
if(movie.genere === "War") {
  this.messageOfCarlo = "Adoro l'odore del napalm al mattino"
}
if(movie.genere === "Mystery") {
  this.messageOfCarlo = "Film banale come la tua giornata"
}
if(movie.genere === "Biography") {
  this.messageOfCarlo = "Ti piacerebbe eh?"
}
if(movie.genere === "Horror") {
  this.messageOfCarlo = "Non fanno più gli horror di una volta"
}
if(movie.genere === "History") {
  this.messageOfCarlo = "Ma vatti a guardare un documentario"
}

this.carloSvc.messageFromCarlo(this.messageOfCarlo)

}


  addMovie(movie: iMovie) {
    if (this.user) {
      this.userSvc.insertFavorite(movie, this.user);
    }
    this.message(movie)
  }


}
