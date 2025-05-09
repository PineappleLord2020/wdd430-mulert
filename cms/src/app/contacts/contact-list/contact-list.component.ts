import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  @Output() contactSelected = new EventEmitter<Contact>();

  contacts = [
    {
      id: 1,
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: 'images/jacksonk.jpg',
      group: null,
    },
    {
      id: 2,
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: 'images/barzeer.jpg',
      group: null,
    },
  ];

  constructor() {}

  ngOnInit() {}

  onSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
