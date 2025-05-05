import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent implements OnInit {
  @Input() contact: {id: number, name: string, email: string, phone: string, imageUrl: string, group?: Contact[]};

  constructor() {}

  ngOnInit() {}
  //@Input() contact!: ContactListComponent;
  
}
