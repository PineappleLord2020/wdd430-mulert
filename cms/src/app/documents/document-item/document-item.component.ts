import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent implements OnInit{
  @Input() document: Document | null=null;
  @Output() documentSelected = new EventEmitter<Document>();

  constructor() {}

  ngOnInit() {}

}
