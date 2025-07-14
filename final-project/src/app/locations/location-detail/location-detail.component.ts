import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '../location.model';
import { LocationService } from '../location.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css',
  imports: [
    RouterModule
  ]
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  nativeWindow: any;
  location!: Location;
  private paramsSubscription!: Subscription;
  private locationChangedSubscription!: Subscription;
  
  constructor( 
    private LocationService: LocationService, 
    private router: Router, 
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { 
    this.nativeWindow = windRefService.getNativeWindow();
  };

  ngOnInit(): void{
    this.paramsSubscription = this.route.params.subscribe(
      (params) => {
        const id = params['id'];

        this.location = this.LocationService.getLocation(id);

        if (!this.location) {
          this.locationChangedSubscription = this.LocationService.locationChangedEvent.subscribe(
            (locations: Location[]) => {
              this.location = this.LocationService.getLocation(id);
              if (this.location && this.locationChangedSubscription) {
                this.locationChangedSubscription.unsubscribe();
              }
            }
          )
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.locationChangedSubscription) {
      this.locationChangedSubscription.unsubscribe();
    }
  }

  onDelete() {
    this.LocationService.deleteLocation(this.location);
    this.router.navigate(['locations']);
  }
}
