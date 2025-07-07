import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  nativeWindow: any;
  
  constructor( 
    private BooksService: BooksService, 
    private router: Router, 
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { 
    this.nativeWindow = windRefService.getNativeWindow();
  };
  
  book: Book;

  ngOnInit(): void{
    this.route.params.subscribe(
      (params) =>{
        const id = params['id'];

        this.book = this.BooksService.getBook(id);
      }
    );
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
