import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Book } from '../book.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ]
})
export class BookEditComponent implements OnInit {

  originalBook: Book;
  book: Book;
  editMode: boolean = false;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe (
      (params: Params) => {
        const id = params['id'];
        if (id === null || id === undefined){
          this.editMode = false;
          return;
        }

        this.originalBook = this.bookService.getBook(id);

        if (this.originalBook === null || this.originalBook === undefined){
          return;
        }

        this.editMode = true;

        this.book = JSON.parse(JSON.stringify(this.originalBook));
      }
    )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newBook: Book = {
      id: this.editMode && this.originalBook ? this.originalBook.id : '',
      name: value.name,
      description: value.description,
      url: value.url,
      release: value.release,
      children: value.children,
    };

    if (this.editMode === true){
      this.bookService.updateBook(this.originalBook as Book, newBook)
    } else {
      this.bookService.addBook(newBook)
    }
    
    this.router.navigate(['/books'])
  }

  onCancel(){
    this.router.navigate(['/books']);
  }
}
