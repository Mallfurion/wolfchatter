import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { ChatMessage } from '../shared/models/message';

@Component({
  selector: 'wolfchatter-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @Input() chatId: number;
  messages: ChatMessage[] = [];
  newMessage: string;

  constructor(private chatService: ChatService) { }
  @ViewChild('messagesContainer') messagesContainer: ElementRef;

  ngOnChanges(): void {
    if (this.chatId) {
      this.messages = [];
      this.chatService.getMessages(this.chatId).subscribe((messages: ChatMessage[]) => {
        this.messages = messages;
        this.scrollContainer();
      })
    }
  }

  addMessage() {
    this.chatService.addMessage(this.chatId, this.newMessage).subscribe((res: ChatMessage) => {
      this.messages.push(res);
      this.newMessage = null;
      this.scrollContainer();
    });
  }

  scrollContainer() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 10);
  }
}
