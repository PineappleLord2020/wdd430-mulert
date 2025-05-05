import { Component, OnInit } from '@angular/core';

import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  ContactItemComponent

  constructor() { }

  ngOnInit() {

  }
}
