import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iUser } from '../models/i-user';
import { environment } from '../../environments/environment.development';
import { iMovie } from '../models/i-movie';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {this.getAllUsers()}


private usersBh = new BehaviorSubject<iUser[]>([])
user$ = this.usersBh.asObservable()
arrayDiServizio!:iUser[]

getAllUsers():void {
  this.http.get<iUser[]>(environment.urlUser).subscribe(userList => {
    this.usersBh.next(userList)
    this.arrayDiServizio = userList
  })
}


// per inserire il film preferito nell'id giusto ho pensato di confrontarlo con quello del localstorage

insertFavorite(movie: iMovie, user: iUser) {
  const accessData = JSON.parse(localStorage.getItem("accessData") || '{}');
  const userIdFromStorage = accessData.user?.id;

  if (user.id === userIdFromStorage) {
    const updatedUser: iUser = {
      ...user,
      favorites: [...(user.favorites || []), movie]
    };

    this.http.put<iUser>(`${environment.urlUser}/${user.id}`, updatedUser).subscribe(() => {
      const userIndex = this.arrayDiServizio.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        this.arrayDiServizio[userIndex] = updatedUser;
        this.usersBh.next([...this.arrayDiServizio]);
      }
    });
  } else {
    console.error("L'ID utente dal localStorage non corrisponde all'ID dell'utente attuale.");
  }
}




}
