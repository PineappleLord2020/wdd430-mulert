import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { MOCKMESSAGES } from './MOCKMESSAGES';

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
    const firebaseUrl = 'https://fullstackdevelopment61625-default-rtdb.firebaseio.com/messages.json'

    this.http.get<Message[]>(firebaseUrl)
    .subscribe({
      next: (messages: Message[]) => {
        console.log('MessageService: Messages fetched successfully from Firebase:', messages);
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();

        this.messageChangedEvent.emit(this.messages.slice());
      },
      error: (error: any) => {
        console.error('MessageService: Error fetching messages from Firebase:', error);
        this.messageChangedEvent.emit([]);
      }
    })
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
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
    console.log('Message added (will be stored):', message);
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
