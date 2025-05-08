import { Component, Input } from '@angular/core';

import { Contact } from "../contacts/contact.model";


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
    selectedContact: Contact
}
