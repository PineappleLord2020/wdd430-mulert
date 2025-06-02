import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  subscription = new Subscription;

  constructor( private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
            (contactList: Contact[]) => {
              this.contacts = contactList;
            }
          )

    /*this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )*/
  }

  ngOnDestroy(): void {

  }
}
