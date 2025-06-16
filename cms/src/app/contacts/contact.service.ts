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
    this.maxContactId = this.getMaxId();
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/contacts.json';
    
        interface FirebaseContactResponse extends Contact {
          children?: FirebaseContactResponse[];
        }
    
        this.http.get<FirebaseContactResponse[]>(firebaseUrl).pipe(
          tap(rawData => {
            console.log('ContactsService: RAW data from Firebase:', rawData)
          }),
          map(firebaseData => {
            const allContacts: Contact[] = [];
    
            const flattenContacts = (items: FirebaseContactResponse[]) => {
              if (!items) return;
    
              items.forEach(item => {
                allContacts.push({
                  id: item.id,
                  name: item.name,
                  email: item.email,
                  imageUrl: item.imageUrl,
                  phone: item.phone,
                  group: []
                });
    
                if (item.children && item.children.length > 0) {
                  flattenContacts(item.children);
                }
              });
          };
    
          flattenContacts(firebaseData);
    
          return allContacts;
        }),
        tap(flattenedData => {
          console.log('ContactsService: Flattened data AFTER map operator:', flattenedData);
        })
        ).subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
    
            this.contacts.sort((a, b) => {
              const nameA = a.name ? a.name.toLowerCase() : '';
              const nameB = b.name ? b.name.toLowerCase() : '';
    
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0
            });
    
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          (error: any) => {
            console.error('Error fetching contacts:', error);
            this.contactListChangedEvent.next([]);
          }
        );
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

    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }

  storeContacts() {
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/contacts.json';
    const contactsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(firebaseUrl, contactsJson, { headers: headers })
      .subscribe(() => {
        console.log('ContactsService: Contacts successfully stored on Firebase.');
        this.contactListChangedEvent.next(this.contacts.slice())
      }, (error) => {
        console.error('ContactsService: Error storing contacts on Firebase:', error);
      });
  }
}
