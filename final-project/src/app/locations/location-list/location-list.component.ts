import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Location } from '../location.model';
import { LocationService } from '../location.service'

@Component({
  selector: 'app-location-list',
  standalone: false,
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit, OnDestroy {

  locations: Location[] = [];
  subscription = new Subscription;

  constructor(private locationService: LocationService) {}
  
    ngOnInit(): void {
      this.locations = this.locationService.getLocations();

      /*this.subscription = this.locationService.locationChangedEvent.subscribe(
        (locations: Location[])=> {
          this.locations = locations;
        }
      )*/
    }

    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
