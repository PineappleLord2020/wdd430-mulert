import { Component, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();


  messages = [
    {
      subject: 'Can I go home please?',
      msgText: 'It has been 20 years. Guys? Anyone?',
      sender: 'Odysseus',
    },
    {
      subject: 'Told you so',
      msgText: 'You messed up. I gave you a warning',
      sender: 'Athena',
    },
    {
      subject: 'LOL, Idiot',
      msgText: 'Totally deserves to be punished ngl.',
      sender: 'Zeus',
    },
  ];

  constructor() {}
  
    ngOnInit() {}
  
    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}
