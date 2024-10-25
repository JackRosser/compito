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

carloButtonSpost: string = "bottom: 10px; left: 10px;";

get carloButton(): string {
  return `position: absolute; z-index:60; ${this.carloButtonSpost}`;
}

spost(): void {
  switch (this.carloButtonSpost) {
    case "bottom: 10px; left: 10px;":
      this.carloButtonSpost = "bottom: 200px; left: 10px;";
      break;
    case "bottom: 200px; left: 10px;":
      this.carloButtonSpost = "bottom: 200px; left: 200px;";
      break;
    case "bottom: 200px; left: 200px;":
      this.carloButtonSpost = "bottom: 10px; left: 200px;";
      break;
    case "bottom: 10px; left: 200px;":
      this.carloButtonSpost = "bottom: 10px; left: 10px;";
      break;
  }
}


  ngOnInit(): void {
    this.carloSvc.trollFace$.subscribe(value => {
      this.trollToggle = value;
    });
this.carloSvc.carloMsg$.subscribe(message => {
  this.whatCarloSay = message
})

  }
}
