import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iMovie } from '../models/i-movie';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) {this.getAllMovies()}

private moviesBh = new BehaviorSubject<iMovie[]>([])
movie$ = this.moviesBh.asObservable()


private getAllMovies():void {
  this.http.get<iMovie[]>(environment.urlMovies).subscribe(moviesList => {
    this.moviesBh.next(moviesList)
  })
}



}
