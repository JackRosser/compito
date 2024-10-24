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

  ngOnInit(): void {
    this.carloSvc.trollFace$.subscribe(value => {
      this.trollToggle = value;
    });
  }
}
