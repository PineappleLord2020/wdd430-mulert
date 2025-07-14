import { Injectable, EventEmitter } from '@angular/core';
import { Location } from './location.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { MOCKLOCATION } from './MOCKLOCATIONS';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Location[] = [];
  locationChangedEvent = new EventEmitter<Location[]>();
  maxLocationId: number = 0;

  constructor(private http: HttpClient) {  }

  fetchLocations() {

    interface NodeJsLocationsResponse {
      message: string;
      locations: Location[];
    }

    this.http.get<NodeJsLocationsResponse>('http://localhost:3000/api/locations').pipe(
      tap(rawData => {
        console.log('LocationService: Raw data from NodeJS:', rawData)
      }),
      map(response => {
        return response.locations;
      }),
      tap(extractedLocations => {
        console.log('LocationService: Extracted locations AFTER map operator:', extractedLocations);
      })
    ).subscribe(
      {
        next: (locations: Location[]) => {
          console.log('LocationService: Locations fetched successfully from Node.js:', locations);
        this.locations = locations || [];
        this.maxLocationId = this.getMaxId();

        this.locationChangedEvent.emit(this.locations.slice());
      },
      error: (error: any) => {
        console.error('LocationService: Error fetching locations from Node.js:', error);
        this.locationChangedEvent.emit([]);
      }
    }
  );
}

  getLocations(): Location[] {
    return this.locations.slice();
  }

  getLocation(id:string): Location | null{
    for (const location of this.locations){
      if (location.id === id){
        return location;
      }
    }
    return null;
  }

  addLocation(newLocation: Location){
    if (!newLocation) {
      return;
    }
    
    newLocation.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.post<{ location: String, newLocation: Location }>(
      'http://localhost:3000/api/locations',
      newLocation,
      { headers: headers }
    ).subscribe({
      next: (responseData) => {
        console.log('LocationService: Location added successfully to Node.js:', responseData.location);
        this.locations.push(responseData.newLocation);
        this.locationChangedEvent.emit(this.locations.slice());
      }
    })
  }

  updateLocation(originalLocation: Location, newLocation: Location) {
    if (!originalLocation || !newLocation || !originalLocation.id) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put<void>('http://localhost:3000/api/locations/' + originalLocation.id, newLocation, { headers: headers})
      .subscribe(
        () => {
        console.log('LocationService: Location updated successfully on Node.js');
        
        const pos = this.locations.indexOf(originalLocation);
          if (pos > -1) {
            newLocation.id = originalLocation.id;

            this.locations[pos] = newLocation;
            this.locationChangedEvent.emit(this.locations.slice());
          }
        },
      (error) => {
        console.error('LocationService: Error updating location on Node.js', error);
      }
    );
  }

  deleteLocation(location: Location) {
    if (!location || !location.id) {
      return;
    }
    
    this.http.delete('http://localhost:3000/api/locations/' + location.id)
      .subscribe({
        next: () => {
          const pos = this.locations.indexOf(location);
          if (pos > -1) {
            this.locations.splice(pos, 1);
            this.locationChangedEvent.emit(this.locations.slice());
          }
        }
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let location of this.locations) {
      const currentId = parseInt(location.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeLocations() {
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/locations.json';
    const locationsJson = JSON.stringify(this.locations);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put(firebaseUrl, locationsJson, { headers: headers})
    .subscribe(() => {
      console.log('LocationService: Locations successfully stored on Firebase.');
      this.locationChangedEvent.emit(this.locations.slice());
    }, (error) => {
      console.error('LocationService: Error storing locations on Firebase:', error)
    });
  }
}
