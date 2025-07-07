import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  standalone: false,
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent implements OnInit, OnDestroy {

  authors: Author[] = [];
  subscription = new Subscription;
  term: string;
  search(value: string) {
    this.term = value;
  }

  constructor( private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authors = this.authorService.getAuthors();

    this.subscription = this.authorService.authorListChangedEvent.subscribe(
            (authorList: Author[]) => {
              this.authors = authorList;
            }
          )

    /*this.authorService.authorChangedEvent.subscribe(
      (authors: Author[]) => {
        this.authors = authors;
      }
    )*/
  }

  ngOnDestroy(): void {

  }
}
