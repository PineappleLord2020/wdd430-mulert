import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location.model';

@Component({
  selector: 'app-location-edit',
  standalone: false,
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.css'
})
export class LocationEditComponent {
  currentSender: string = 'Andrew Mulert';
  @ViewChild('subject') subjectInput: ElementRef;
  @ViewChild('msgText') msgTextInput: ElementRef;
  @Output() addLocationEvent = new EventEmitter<Location>();

  constructor(private locationService: LocationService) {}

  onSendLocation(){
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
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
