import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model'
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] =[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

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

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
