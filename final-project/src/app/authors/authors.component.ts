import { Component, OnInit } from '@angular/core';
import { Author } from "./author.model";
import { AuthorService } from "./author.service"


@Component({
  selector: 'app-authors',
  standalone: false,
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  selectedAuthor: Author;

  constructor (private authorService: AuthorService) {}
  
  ngOnInit(): void {
    this.authorService.authorSelectedEvent.subscribe(
      (author: Author) => {
        this.selectedAuthor = author;
      }
    )
  }
}
