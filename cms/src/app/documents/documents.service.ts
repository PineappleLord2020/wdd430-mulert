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
    const documentsUrl = 'http://localhost:3000/documents';

    interface NodeJsDocumentsResponse {
      message: string;
      documents: Document[];
    }

    this.http.get<NodeJsDocumentsResponse>(documentsUrl).pipe(
      tap(rawData => {
        console.log('DocumentsService: RAW data from NodeJS:', rawData)
      }),
      map(response => {
        return response.documents;
    }),
    tap(extractedDocuments => {
      console.log('DocumentsService: Extracted data AFTER map operator:', extractedDocuments);
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

  private sortAndSend() {
    this.documents.sort((a, b) => {
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

    this.documentListChangedEvent.next(this.documents.slice());
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

  addDocument(document: Document) {
    if(!document) {
      return;
    }
    
    document.id = '';
    
    const headers = new HttpHeaders ({'Content-Type':'application/json'});

    this.http.post<{ message: string, document: Document }>
    ('http://localhost:3000/documents',
      document,
      {headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
    }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument ) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, {headers: headers }).subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0){
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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
