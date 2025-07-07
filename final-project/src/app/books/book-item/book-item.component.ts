import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Book } from '../book.model';

@Component({
  selector: 'app-book-item',
  standalone: false,
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit{
  @Input() book: Book | null=null;
  @Output() bookSelected = new EventEmitter<Book>();

  constructor() {}

  ngOnInit() {}

}
