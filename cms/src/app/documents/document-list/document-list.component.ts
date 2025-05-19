import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from "../document.model"
import { DocumentsService } from "../documents.service"

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {

    documents: Document [] = [];

    constructor(private documentService: DocumentsService) {}

    ngOnInit(): void {
      this.documents = this.documentService.getDocuments();
    }

    onSelected(document: Document){
      this.documentService.documentSelectedEvent.emit(document);
    }
}
