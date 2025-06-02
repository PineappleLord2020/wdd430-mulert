import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model'
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] =[];
  maxDocumentId: number;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
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

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }
    
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
    
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument ) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
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
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }
}
