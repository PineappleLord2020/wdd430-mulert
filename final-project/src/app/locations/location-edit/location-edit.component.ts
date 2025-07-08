import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../location.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '../location.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location-edit',
  standalone: false,
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.css'
})
export class LocationEditComponent {
  originalLocation: Location;
  location: Location;
  editMode: boolean = false;
  @ViewChild('name') nameInput: ElementRef;
  @ViewChild('address') addressInput: ElementRef;
  @ViewChild('phone') phoneInput: ElementRef;

  constructor(private locationService: LocationService, private router: Router, private route: ActivatedRoute) {}

  /*onSendLocation(){
    const subjectValue = this.subjectInput.nativeElement.value;
    const msgTextValue = this.msgTextInput.nativeElement.value;
    const newLocation = new Location(
      Math.random().toString(),
      this.currentSender,
      subjectValue,
      msgTextValue
    );
    this.locationService.addLocation(newLocation);
    this.onClear();
  }*/

  onSubmit(form: NgForm){
    const value = form.value;
    const newLocation: Location = {
      id: this.editMode && this.originalLocation ? this.originalLocation.id: '',
      name: value.name,
      address: value.address,
      phone: value.phone,
    };

    if (this.editMode === true){
      this.locationService.updateLocation(this.originalLocation as Location, newLocation)
    } else {
      this.locationService.addLocation(newLocation)
    }

    this.router.navigate(['/locations'])
  }

  onClear() {
    this.nameInput.nativeElement.value = '';
    this.addressInput.nativeElement.value = '';
    this.phoneInput.nativeElement.value = '';
  }

  onCancel(){
    this.router.navigate(['/locations']);
  }
}
