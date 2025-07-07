import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Author } from '../author.model';

@Component({
  selector: 'app-author-item',
  standalone: false,
  templateUrl: './author-item.component.html',
  styleUrl: './author-item.component.css'
})
export class AuthorItemComponent implements OnInit {
  @Input() author: Author | null=null;
  @Output() authorSelected = new EventEmitter<Author>();

  constructor() {}

  ngOnInit() {}
  
}
