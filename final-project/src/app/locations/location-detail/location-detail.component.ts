import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

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
export class LocationDetailComponent implements OnInit {
  nativeWindow: any;
  
  constructor( 
    private LocationService: LocationService, 
    private router: Router, 
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { 
    this.nativeWindow = windRefService.getNativeWindow();
  };
  
  location: Location;

  ngOnInit(): void{
    this.route.params.subscribe(
      (params) =>{
        const id = params['id'];

        this.location = this.LocationService.getLocation(id);
      }
    );
  }

  onDelete() {
    this.LocationService.deleteLocation(this.location);
    this.router.navigate(['locations']);
  }
}
