import { Component } from '@angular/core';
import { DocumentsService } from './documents.service'
import { Document } from './document.model'

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument: Document;
  
    constructor (private documentService: DocumentsService) {}
    
    ngOnInit(): void {
      this.documentService.documentSelectedEvent.subscribe(
        (document: Document) => {
          this.selectedDocument = document;
        }
      )
    }
}
