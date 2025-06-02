import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model'
import {MOCKCONTACTS} from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactId: number;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts){
      if (contact.id === id){
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if(!newContact) {
      return;
    }

    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }
}
