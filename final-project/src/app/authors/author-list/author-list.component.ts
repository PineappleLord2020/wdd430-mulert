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
  subscription!: Subscription;
  term: string;
  search(value: string) {
    this.term = value;
  }

  constructor( private authorService: AuthorService) {}

  ngOnInit(): void {
    console.log('AuthorListComponent: ngOnInit - Starting');
    this.authorService.fetchAuthors();

    console.log('AuthorListComponent: ngOnInit - After fetchAuthors() call, current authors:', this.authors);

    this.authors = this.authorService.getAuthors();

    console.log('AuthorListComponent: ngOnInit - After getAuthors(), current authors:', this.authors);

    this.subscription = this.authorService.authorListChangedEvent.subscribe(
            (authorList: Author[]) => {
              console.log('AuthorListComponent: Received updated authors from service via subscription:', authorList);
              this.authors = authorList;
              console.log('AuthorListComponent: Authors array updated via subscription:', this.authors);
            }
          )

    /*this.authorService.authorChangedEvent.subscribe(
      (authors: Author[]) => {
        this.authors = authors;
      }
    )*/
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('AuthorListComponent: Unsubscribed from authorListChangedEvent.');
    }
  }
}
