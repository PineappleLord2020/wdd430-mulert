import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../location.model'
import { LocationService } from '../location.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrl: './location-item.component.css'
})
export class LocationItemComponent implements OnInit {
  @Input() location!: Location;

  locationPhone: string;

  constructor(private router: Router){};

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['locations', this.location.id]);
  }
}
