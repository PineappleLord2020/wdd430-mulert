import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model'

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = 'Andrew Mulert';
  @ViewChild('subject') subjectInput: ElementRef;
  @ViewChild('msgText') msgTextInput: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  
  onSendMessage(){
    const subjectValue = this.subjectInput.nativeElement.value;
    const msgTextValue = this.msgTextInput.nativeElement.value;
    const newMessage = new Message(
      Math.random(),
      this.currentSender,
      subjectValue,
      msgTextValue
    );
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
