import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe (
      (params: Params) => {
        const id = params['id'];
        if (id === null || id === undefined){
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if (this.originalDocument === null || this.originalDocument === undefined){
          return;
        }

        this.editMode = true;

        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newDocument: Document = {
      id: this.editMode && this.originalDocument ? this.originalDocument.id : '',
      name: value.name,
      description: value.description,
      url: value.url,
      children: value.children,
    };

    if (this.editMode === true){
      this.documentService.updateDocument(this.originalDocument as Document, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    }
    
    this.router.navigate(['/documents'])
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }
}
