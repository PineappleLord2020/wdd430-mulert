import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model'
import { Author } from '../../authors/author.model'
import { AuthorService } from '../../authors/author.service'

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string;

  constructor(private authorService: AuthorService){};

  ngOnInit(): void {
    const author: Author | undefined = this.authorService.getAuthor(this.message.sender);
    if (author) {
      this.messageSender = author.name;
    } else {
      this.messageSender = 'Unknown Sender';
    }
  }
}
