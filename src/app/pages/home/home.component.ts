// home.component.ts
import { Component } from '@angular/core';
import { iMovie } from '../../models/i-movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

constructor(private movieSv:MoviesService) {}

listOfFilms!:iMovie[]

ngOnInit() {
this.movieSv.movie$.subscribe(list => {
  this.listOfFilms = list
  console.log(this.listOfFilms);

})
}

}
