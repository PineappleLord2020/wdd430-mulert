import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] = [];
  maxDocumentId: number = 0;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) { 
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/documents.json';

    interface FirebaseDocumentResponse extends Document {
      children?: FirebaseDocumentResponse[];
    }

    this.http.get<FirebaseDocumentResponse[]>(firebaseUrl).pipe(
      tap(rawData => {
        console.log('DocumentsService: RAW data from Firebase:', rawData)
      }),
      map(firebaseData => {
        const allDocuments: Document[] = [];

        const flattenDocuments = (items: FirebaseDocumentResponse[]) => {
          if (!items) return;

          items.forEach(item => {
            allDocuments.push({
              id: item.id,
              name: item.name,
              description: item.description,
              url: item.url,
              children: []
            });

            if (item.children && item.children.length > 0) {
              flattenDocuments(item.children);
            }
          });
      };

      flattenDocuments(firebaseData);

      return allDocuments;
    }),
    tap(flattenedData => {
      console.log('DocumentsService: Flattened data AFTER map operator:', flattenedData);
    })
    ).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();

        this.documents.sort((a, b) => {
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

        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
        this.documentListChangedEvent.next([]);
      }
    );
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

    this.storeDocuments();
    
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/documents.json';
    const documentsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(firebaseUrl, documentsJson, { headers: headers })
      .subscribe(() => {
        console.log('DocumentsService: Documents successfully stored on Firebase.');
        this.documentListChangedEvent.next(this.documents.slice())
      }, (error) => {
        console.error('DocumentsService: Error storing documents on Firebase:', error);
      });
  }
}
