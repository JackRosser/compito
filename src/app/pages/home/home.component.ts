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

  addMovie(movie: iMovie) {
    if (this.user) {
      this.userSvc.insertFavorite(movie, this.user);
    } else {
    }
  }


}
