import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Author } from '../author.model'
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-detail',
  standalone: false,
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})
export class AuthorDetailComponent implements OnInit {
  nativeWindow: any;
  author: Author;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.author = this.authorService.getAuthor(id);
      }
    );
  }

  onDelete() {
    this.authorService.deleteAuthor(this.author);
    this.router.navigateByUrl('/authors');
  }
}
