import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarlocontiService {

  constructor() { }

private trollFaceBh = new BehaviorSubject<boolean>(false)
  trollFace$ = this.trollFaceBh.asObservable()

baloon:string = ""

private carloMsg = new BehaviorSubject<string>(this.baloon)
carloMsg$ = this.carloMsg.asObservable()

trollOn(value:boolean):void {
  this.trollFaceBh.next(value)
  }

messageFromCarlo(message:string):void {
  this.carloMsg.next(message)
}


}



