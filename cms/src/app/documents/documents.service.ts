import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model'
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] =[];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id:string){
    for (const document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }
}
