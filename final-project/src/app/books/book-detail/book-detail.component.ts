import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit, OnDestroy {
  nativeWindow: any;
  book!: Book;
  private paramsSubscription!: Subscription;
  private booksChangedSubscription!: Subscription;
  
  constructor( 
    private BooksService: BooksService, 
    private router: Router, 
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { 
    this.nativeWindow = windRefService.getNativeWindow();
  };

  ngOnInit(): void{
    this.paramsSubscription = this.route.params.subscribe(
      (params) =>{
        const id = params['id'];

        this.book = this.BooksService.getBook(id);

        if (!this.book) {
          this.booksChangedSubscription = this.BooksService.bookListChangedEvent.subscribe(
            (books: Book[]) => {
              this.book = this.BooksService.getBook(id);

              if (this.book && this.booksChangedSubscription) {
                this.booksChangedSubscription.unsubscribe();
              }
            }
          )
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.booksChangedSubscription) {
      this.booksChangedSubscription.unsubscribe();
    }
  }

  onView() {
    if (this.book.url) {
      this.nativeWindow.open(this.book.url);
    }
  }

  onDelete() {
    this.BooksService.deleteBook(this.book);
    this.router.navigate(['books']);
  }
}
