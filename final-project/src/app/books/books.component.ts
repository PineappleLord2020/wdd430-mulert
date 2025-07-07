import { Component } from '@angular/core';
import { BooksService } from './books.service'
import { Book } from './book.model'

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  selectedBook: Book;
  
    constructor (private bookService: BooksService) {}
    
    ngOnInit(): void {
      this.bookService.bookSelectedEvent.subscribe(
        (book: Book) => {
          this.selectedBook = book;
        }
      )
    }
}
