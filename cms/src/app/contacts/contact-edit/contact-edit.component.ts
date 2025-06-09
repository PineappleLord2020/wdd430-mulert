import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

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

  onSubmit(){
    
  }
}
