import { Component, Input, OnInit } from '@angular/core';

import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent implements OnInit {
  element: {id: number, name: string, email: string, phone: string, imageUrl: string, group?: Contact[]};

  constructor() {}

  ngOnInit() {}
  //@Input() contact!: ContactListComponent;
  
}
