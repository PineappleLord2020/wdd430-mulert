import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model'
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactId: number = 0;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) { 
    this.fetchContacts();
  }
  
  private fetchContacts() {
    const contactsUrl = 'https://localhost:3000/contacts';
        interface NodeJsContactsResponse {
          message: string;
          contacts: Contact[];
        }
    
        this.http.get<NodeJsContactsResponse>(contactsUrl).pipe(
          tap(rawData => {
            console.log('ContactService: RAW data from NodeJS:', rawData)
          }),
          map(response => {
            return response.contacts;
          }),
          tap(extractedContacts => {
            console.log('ContactService: Extracted contacts After map operator:', extractedContacts);
          })
        ).subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.sortAndEmitList();
          },
          (error: any) => {
            console.error('ContactService: Error fetching contacts from Node.js:', error);
            this.contactListChangedEvent.next([]);
          }
        );
  }

  private sortAndEmitList() {
    this.contacts.sort((a, b) => {
      const nameA = a.name ? a.name.toLowerCase() : '';
      const nameB = b.name ? b.name.toLowerCase() : '';

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
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

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.post<{ message: String, newContact: Contact }>(
      'http://localhost:3000/contacts',
      newContact,
      {headers: headers }
    ).subscribe(
      (responseData) => {
        console.log('ContactService: Contact added successfully to Node.js:', responseData.newContact);
        this.contacts.push(responseData.newContact);
        this.sortAndEmitList();
      },
      (error) => {
        console.error('ContactService: Error adding contact to Node.js:', error);
      }
    );
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact || !originalContact.id) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put<void>(
      'http://localhost:3000/contacts/' + originalContact.id,
      newContact,
      { headers: headers }
    ).subscribe(
      () => {
        console.log('ContactService: Contact updated successfully on Node.js.');

        const pos = this.contacts.indexOf(originalContact);
        if (pos > -1) {
          newContact.id = originalContact.id;

          this.contacts[pos] = newContact;
          this.sortAndEmitList();
        }
      },
      (error) => {
        console.error('ContactService: Error updating contact on Node.js:', error);
      }
    );
  }

  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    this.http.delete<void>('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        () => {
          console.log('ContactService: Contact deleted successfully from Node.js.');

          const pos = this.contacts.indexOf(contact);
          if (pos > -1) {
            this.contacts.splice(pos, 1);
            this.sortAndEmitList();
          }
        },
        (error) => {
          console.error('ContactService: Error deleting contact from Node.js:', error);
        }
      );
  }
}
