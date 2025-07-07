import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './author.model'

@Pipe({
  name: 'authorsFilter',
  standalone: false
})
export class AuthorsFilterPipe implements PipeTransform {

  transform(authors: Author[], term: string): any {
    let filteredAuthors: Author[] = [];
    if (term && term.length > 0) {
      filteredAuthors = authors.filter(
        (author:Author) =>
          author.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filteredAuthors.length < 1){
      return authors;
    }
    return filteredAuthors;
  }
}
