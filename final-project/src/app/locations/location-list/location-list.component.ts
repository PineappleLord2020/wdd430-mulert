import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '../location.model';
import { LocationService } from '../location.service'

@Component({
  selector: 'app-location-list',
  standalone: false,
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {

  locations: Location[] = [];

  constructor(private locationService: LocationService) {}
  
    ngOnInit(): void {
      this.locations = this.locationService.getLocations();
      this.locationService.locationChangedEvent.subscribe(
        (locations: Location[])=> {
          this.locations = locations;
        })
    }
}
