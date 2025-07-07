import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Author } from './author.model'
import { MOCKAUTHORS } from './MOCKAUTHORS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  authors: Author[] = [];
  maxAuthorId: number = 0;
  authorSelectedEvent = new EventEmitter<Author>();
  authorChangedEvent = new EventEmitter<Author[]>();
  authorListChangedEvent = new Subject<Author[]>();

  constructor(private http: HttpClient) { 
    this.fetchAuthors();
  }
  
  private fetchAuthors() {
    const authorsUrl = 'https://localhost:3000/authors';
        interface NodeJsAuthorsResponse {
          message: string;
          authors: Author[];
        }
    
        this.http.get<NodeJsAuthorsResponse>(authorsUrl).pipe(
          tap(rawData => {
            console.log('AuthorService: RAW data from NodeJS:', rawData)
          }),
          map(response => {
            return response.authors;
          }),
          tap(extractedAuthors => {
            console.log('AuthorService: Extracted authors After map operator:', extractedAuthors);
          })
        ).subscribe(
          (authors: Author[]) => {
            this.authors = authors;
            this.maxAuthorId = this.getMaxId();
            this.sortAndEmitList();
          },
          (error: any) => {
            console.error('AuthorService: Error fetching authors from Node.js:', error);
            this.authorListChangedEvent.next([]);
          }
        );
  }

  private sortAndEmitList() {
    this.authors.sort((a, b) => {
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
    this.authorListChangedEvent.next(this.authors.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let author of this.authors) {
      const currentId = parseInt(author.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getAuthors(): Author[] {
    return this.authors.slice();
  }

  getAuthor(id: string): Author | null {
    for (const author of this.authors){
      if (author.id === id){
        return author;
      }
    }
    return null;
  }

  addAuthor(newAuthor: Author) {
    if(!newAuthor) {
      return;
    }

    newAuthor.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.post<{ message: String, newAuthor: Author }>(
      'http://localhost:3000/authors',
      newAuthor,
      {headers: headers }
    ).subscribe(
      (responseData) => {
        console.log('AuthorService: Author added successfully to Node.js:', responseData.newAuthor);
        this.authors.push(responseData.newAuthor);
        this.sortAndEmitList();
      },
      (error) => {
        console.error('AuthorService: Error adding author to Node.js:', error);
      }
    );
  }

  updateAuthor(originalAuthor: Author, newAuthor: Author){
    if (!originalAuthor || !newAuthor || !originalAuthor.id) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put<void>(
      'http://localhost:3000/authors/' + originalAuthor.id,
      newAuthor,
      { headers: headers }
    ).subscribe(
      () => {
        console.log('AuthorService: Author updated successfully on Node.js.');

        const pos = this.authors.indexOf(originalAuthor);
        if (pos > -1) {
          newAuthor.id = originalAuthor.id;

          this.authors[pos] = newAuthor;
          this.sortAndEmitList();
        }
      },
      (error) => {
        console.error('AuthorService: Error updating author on Node.js:', error);
      }
    );
  }

  deleteAuthor(author: Author){
    if (!author) {
      return;
    }
    this.http.delete<void>('http://localhost:3000/authors/' + author.id)
      .subscribe(
        () => {
          console.log('AuthorService: Author deleted successfully from Node.js.');

          const pos = this.authors.indexOf(author);
          if (pos > -1) {
            this.authors.splice(pos, 1);
            this.sortAndEmitList();
          }
        },
        (error) => {
          console.error('AuthorService: Error deleting author from Node.js:', error);
        }
      );
  }
}
