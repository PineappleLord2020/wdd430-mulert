import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe (
      (params: Params) => {
        const id = params["id"];
        if (id === undefined || id === null){
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);

        if (this.originalContact === undefined || this.originalContact === null){
          return
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      }
    )
  }

   onSubmit(form: NgForm){
    const value = form.value;
    const newContact: Contact = {
      id: this.editMode && this.originalContact ? this.originalContact.id : '',
      name: value.name,
      email: value.email,
      phone: value.phone,
      imageUrl: value.imageUrl,
      group: value.group,
    };

    if (this.editMode === true){
      this.contactService.updateContact(this.originalContact as Contact, newContact)
    } else {
      this.contactService.addContact(newContact)
    }
    
    this.router.navigate(['/contacts'])
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact){
      return true;
    }
    if(this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number){
    if(index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
