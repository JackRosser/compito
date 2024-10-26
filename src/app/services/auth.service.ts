import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { iAccess } from '../models/i-access';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iUser } from '../models/i-user';
import { iLogin } from '../models/i-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private redirect:Router) { this.userRefresh()}

// PER VALIDARE IL TOKEN, FA PARTE DI JSONSERVER
jwtHelper:JwtHelperService = new JwtHelperService();

urlForRegister:string = environment.urlRegister
urlForLogin:string = environment.urlLogin

// PUNTO NEVRALGICO PER TUTTI I DATI
private authBh = new BehaviorSubject<iAccess | null>(null)

user$ = this.authBh.asObservable().pipe(
  tap(accessData => this.userLogged == !!accessData),
  map(accessData => accessData?.user)
)

userLogged$ = this.authBh
.pipe(map(accessData => !!accessData))

// DEFINISCO UN TIMER PER IL LOGOUT
userLogged:boolean = false
timer:any



// FUNZIONE DI REGISTRAZIONE, CREO UN OGGETTO PARZIALE DI iUSER E LO "POSTO"
  register(newUser:Partial<iUser>){
    return this.http.post<iAccess>(this.urlForRegister, newUser)
  }

// FUNZIONE PER IL LOGIN FACCIO UNA RICHIESTA DI TIPO "POST" E RICEVO IL TOKEN
// POI SETTO I DATI NEL LOCALSTORAGE PER RIMANERE LOGGATO
login(authData: iLogin) {
  return this.http.post<iAccess>(this.urlForLogin, authData).pipe(
    tap(accessData => {
      if (accessData.user && Array.isArray(accessData.user.favorites)) {
        accessData.user.favorites = accessData.user.favorites.filter(film =>
          film && typeof film.id === 'number' && typeof film.title === 'string'
        );
      }
      this.authBh.next(accessData);
      localStorage.setItem('accessData', JSON.stringify(accessData));

      let expDate = this.jwtHelper.getTokenExpirationDate(accessData.token);
      if (!expDate) return;
      this.autoLogout(expDate);
    })
  );
}


// SPARO UN NULL AL BHSUBJECT PRINCIPALE
// DISTRUGGO TUTTO IL LOCALSTORAGE
// REDIRECTO L'UTENTE ALLA PAGINA DI LOGIN

  logout(){
    this.authBh.next(null)
    localStorage.removeItem('accessData')
    this.redirect.navigate(['/login']);
  }

  autoLogout(expDate:Date){
    // RESETTO IL TIMER
    const expMs = expDate.getTime() - new Date().getTime()

    this.timer = setTimeout(()=>{
      this.logout()
    }, expMs)
  }

  // MI ASSICURO CHE AL REFRESH L'UTENTE RIMANGA LOGGATO
  // ____________________ Michele io non ci sono riuscito a settare il timeout, quindi semplicemente mi assicuro che ci sia l'user nel localstorage
  userRefresh() {
    const userJson: string | null = localStorage.getItem('accessData');

    if (userJson) {
      try {
        const accessData: iAccess = JSON.parse(userJson);
        if (accessData.user && Array.isArray(accessData.user.favorites)) {
          accessData.user.favorites = accessData.user.favorites.filter(film =>
            film && typeof film.id === 'number' && typeof film.title === 'string'
          );
          this.authBh.next(accessData);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    } else {
      this.logout();
    }
  }




}
