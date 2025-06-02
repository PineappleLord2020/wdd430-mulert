import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Document } from "../document.model"
import { DocumentsService } from "../documents.service"

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {

    documents: Document [] = [];
    subscription = new Subscription;

    constructor(private documentService: DocumentsService) {}

    ngOnInit(): void {
      this.documents = this.documentService.getDocuments();
      
      this.subscription = this.documentService.documentListChangedEvent.subscribe(
        (documentList: Document[]) => {
          this.documents = documentList;
        }
      )
      /*this.documentService.documentChangedEvent.subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );*/
    }

    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
