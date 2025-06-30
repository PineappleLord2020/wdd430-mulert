import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { MOCKMESSAGES } from './MOCKMESSAGES';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) { 
    this.fetchMessages();
    
  }

  private fetchMessages() {
    const messagesUrl = 'http://localhost:3000/contacts'

    interface NodeJsMessagesResponse {
      message: string;
      messages: Message[];
    }

    this.http.get<NodeJsMessagesResponse>(messagesUrl).pipe(
      tap(rawData => {
        console.log('MessageService: Raw data from NodeJS:', rawData)
      }),
      map(response => {
        return response.messages;
      }),
      tap(extractedMessages => {
        console.log('MessageService: Extracted messages AFTER map operator:', extractedMessages);
      })
    ).subscribe(
      {
        next: (messages: Message[]) => {
          console.log('MessageService: Messages fetched successfully from Node.js:', messages);
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();

        this.messageChangedEvent.emit(this.messages.slice());
      },
      error: (error: any) => {
        console.error('MessageService: Error fetching messages from Node.js:', error);
        this.messageChangedEvent.emit([]);
      }
    }
  );
}

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id:string): Message | null{
    for (const message of this.messages){
      if (message.id === id){
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message){
    if (!message) {
      return;
    }
    
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.post<{ message: string, newMessage: Message }>(
      'http://localhost:3000/messages',
      message,
      { headers: headers }
    ).subscribe({
      next: (responseData) => {
        console.log('MessageService: Message added successfully to Node.js:', responseData.message);
        this.messages.push(responseData.newMessage);
        this.messageChangedEvent.emit(this.messages.slice());
      }
    })
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage || !originalMessage.id) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/messages/' + originalMessage.id, newMessage, { headers: headers})
      .subscribe({
        next: () => {
          const pos = this.messages.indexOf(originalMessage);
          if (pos > -1) {
            newMessage.id = originalMessage.id;
            this.messages[pos] = newMessage;
            this.messageChangedEvent.emit(this.messages.slice());
          }
        }
      })
  }

  deleteMessage(message: Message) {
    if (!message || !message.id) {
      return;
    }
    
    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe({
        next: () => {
          const pos = this.messages.indexOf(message);
          if (pos > -1) {
            this.messages.splice(pos, 1);
            this.messageChangedEvent.emit(this.messages.slice());
          }
        }
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/messages.json';
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put(firebaseUrl, messagesJson, { headers: headers})
    .subscribe(() => {
      console.log('MessageService: Messages successfully stored on Firebase.');
      this.messageChangedEvent.emit(this.messages.slice());
    }, (error) => {
      console.error('MessageService: Error storing messages on Firebase:', error)
    });
  }
}
