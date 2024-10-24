import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarlocontiService {

  constructor() { }

private trollFaceBh = new BehaviorSubject<boolean>(false)
  trollFace$ = this.trollFaceBh.asObservable()

trollOn(value:boolean):void {
  this.trollFaceBh.next(value)
  }
}



