import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarlocontiService {

  constructor() { }

trollFace$ = new BehaviorSubject<boolean>(false)

trollOn():void {
  this.trollFace$.subscribe(bool => {
    this.trollFace$.next(bool)
  })
}


}
