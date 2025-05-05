import { Component, OnInit } from '@angular/core';

import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  ContactItemComponent = [
    {id: 1, name: "R. Kent Jackson", email: "jacksonk@byui.edu", phone: "208-496-3771", imageUrl: "../../assets/images/jacksonk.jpg", group: null}, 
    {id: 2, name: "Rex Barzee", email: "barzeer@byui.edu", phone: "208-496-3768", imageUrl: "../../assets/images/barzeer.jpg", group: null}]

  constructor() { }

  ngOnInit() {

  }
}
