import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Book } from './book.model';
import { MOCKBOOKS } from './MOCKBOOKS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  maxBookId: number = 0;
  bookSelectedEvent = new EventEmitter<Book>();
  bookChangedEvent = new EventEmitter<Book[]>();
  bookListChangedEvent = new Subject<Book[]>();

  constructor(private http: HttpClient) { 
    const booksUrl = 'http://localhost:3000/api/books';

    interface NodeJsBooksResponse {
      message: string;
      books: Book[];
    }

    this.http.get<NodeJsBooksResponse>(booksUrl).pipe(
      tap(rawData => {
        console.log('BooksService: RAW data from NodeJS:', rawData)
      }),
      map(response => {
        return response.books;
    }),
    tap(extractedBooks => {
      console.log('BooksService: Extracted data AFTER map operator:', extractedBooks);
    })
    ).subscribe(
      (books: Book[]) => {
        this.books = books;
        this.maxBookId = this.getMaxId();

        this.books.sort((a, b) => {
          const nameA = a.name ? a.name.toLowerCase() : '';
          const nameB = b.name ? b.name.toLowerCase() : '';

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0
        });

        this.bookListChangedEvent.next(this.books.slice());
      },
      (error: any) => {
        console.error('Error fetching books:', error);
        this.bookListChangedEvent.next([]);
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let book of this.books) {
      const currentId = parseInt(book.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  private sortAndSend() {
    this.books.sort((a, b) => {
      const nameA = a.name ? a.name.toLowerCase() : '';
      const nameB = b.name ? b.name.toLowerCase() : '';

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    this.bookListChangedEvent.next(this.books.slice());
  }

  getBooks(): Book[] {
    return this.books.slice();
  }

  getBook(id:string){
    for (const book of this.books){
      if (book.id === id){
        return book;
      }
    }
    return null;
  }

  addBook(book: Book) {
    if(!book) {
      return;
    }
    
    book.id = '';
    
    const headers = new HttpHeaders ({'Content-Type':'application/json'});

    this.http.post<{ message: string, book: Book }>
    ('http://localhost:3000/api/books',
      book,
      {headers: headers })
      .subscribe(
        (responseData) => {
          this.books.push(responseData.book);
          this.sortAndSend();
        }
      );
    }

  updateBook(originalBook: Book, newBook: Book){
    if (!originalBook || !newBook ) {
      return;
    }

    const pos = this.books.findIndex(d => d.id === originalBook.id);
    if (pos < 0) {
      return;
    }

    newBook.id = originalBook.id;
    newBook._id = originalBook._id;
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/api/books/' + originalBook.id,
      newBook, {headers: headers }).subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
  }

  deleteBook(book: Book) {
    if (!book) {
      return;
    }
    const pos = this.books.findIndex(d => d.id === book.id);
    if (pos < 0){
      return;
    }
    this.http.delete('http://localhost:3000/api/books/' + book.id)
      .subscribe(
        (response: Response) => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  storeBooks() {
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/books.json';
    const booksJson = JSON.stringify(this.books);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(firebaseUrl, booksJson, { headers: headers })
      .subscribe(() => {
        console.log('BooksService: Books successfully stored on Firebase.');
        this.bookListChangedEvent.next(this.books.slice())
      }, (error) => {
        console.error('BooksService: Error storing books on Firebase:', error);
      });
  }
}
