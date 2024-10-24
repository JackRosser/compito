import { Component, OnInit } from '@angular/core';
import { CarlocontiService } from '../../services/carloconti.service';

@Component({
  selector: 'app-carloconti',
  templateUrl: './carloconti.component.html',
  styleUrls: ['./carloconti.component.scss']
})
export class CarlocontiComponent implements OnInit {

  trollToggle: boolean = false;

  constructor(private carloSvc: CarlocontiService) {}

whatCarloSay!:string


  ngOnInit(): void {
    this.carloSvc.trollFace$.subscribe(value => {
      this.trollToggle = value;
    });
this.carloSvc.carloMsg$.subscribe(message => {
  this.whatCarloSay = message
})

  }
}
