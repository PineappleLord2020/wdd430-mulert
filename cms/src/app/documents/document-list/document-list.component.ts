import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Document } from "../document.model"

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() documentSelected = new EventEmitter<Document>();

    documents = [
      {
        id: 1, 
        name: 'The Odyssey', 
        description: 'A long story about a guy who just wants to go home',
        url: 'https://classics.mit.edu/Homer/odyssey.html',
      },
      {
        id: 2, 
        name: 'The Iliad', 
        description: 'The prequel to the long story, about a war over a woman. Like most wars are.',
        url: 'https://classics.mit.edu/Homer/iliad.html',
      },
      {
        id: 3, 
        name: 'The Lightning Thief', 
        description: 'A shorter story about a boy who wants his mom back',
        url: 'https://rickriordan.com/book/the-lightning-thief/',
      },
      {
        id: 4, 
        name: 'The Sea of Monsters', 
        description: 'A story about saving a summer camp',
        url: 'https://rickriordan.com/book/the-sea-of-monsters/',
      },
      {
        id: 5, 
        name: "The Titan's Curse", 
        description: "A story about a boy who wants to save his friend who he definitely doesn't have feelings for",
        url: 'https://rickriordan.com/book/the-titans-curse/',
      },
    ];

    constructor() {}

    ngOnInit() {}

    onSelected(document: Document){
      this.documentSelected.emit(document);
    }
}
