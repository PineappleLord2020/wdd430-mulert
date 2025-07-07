import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  
  constructor( 
    private documentsService: DocumentsService, 
    private router: Router, 
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { 
    this.nativeWindow = windRefService.getNativeWindow();
  };
  
  document: Document;

  ngOnInit(): void{
    this.route.params.subscribe(
      (params) =>{
        const id = params['id'];

        this.document = this.documentsService.getDocument(id);
      }
    );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }
}
