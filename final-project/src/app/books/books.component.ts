import { Component } from '@angular/core';
import { BooksService } from './books.service'

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  
    constructor (private bookService: BooksService) {}
    
    ngOnInit(): void {
    }
}
