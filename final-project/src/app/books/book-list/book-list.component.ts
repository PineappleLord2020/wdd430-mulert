import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Book } from "../book.model"
import { BooksService } from "../books.service"

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {

    books: Book [] = [];
    subscription = new Subscription;

    constructor(private bookService: BooksService) {}

    ngOnInit(): void {
      this.books = this.bookService.getBooks();
      
      this.subscription = this.bookService.bookListChangedEvent.subscribe(
        (bookList: Book[]) => {
          this.books = bookList;
        }
      )
      /*this.bookService.bookChangedEvent.subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );*/
    }

    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
