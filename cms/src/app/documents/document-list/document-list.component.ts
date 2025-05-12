import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

    documents = [
      {
        id: 1, 
        name: 'The Odyssey', 
        description: 'A long story about a guy who just wants to go home',
        url: 'https://classics.mit.edu/Homer/odyssey.html',
      },
      {
        id: 2, 
        name: 'The Illiad', 
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
        description: "a story about a boy who wants to save his friend who he definitely doesn't have feelings for",
        url: 'https://rickriordan.com/book/the-titans-curse/',
      },
    ];

    constructor() {}

    ngOnInit() {}

    onSelectedDocument(document: Document){
      this.selectedDocumentEvent.emit(document);
    }
}
