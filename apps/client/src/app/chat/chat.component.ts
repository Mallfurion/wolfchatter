import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { environment } from '@wolfchat/client-env';

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
  socket: WebSocket;

  constructor(private chatService: ChatService) { }
  @ViewChild('messagesContainer') messagesContainer: ElementRef;

  ngOnChanges(): void {
    if (this.chatId) {
      this.messages = [];
      this.chatService.getMessages(this.chatId).subscribe((messages: ChatMessage[]) => {
        this.messages = messages;
        this.scrollContainer();
        this.closePreviousSocket();
        this.subscribeToSocket();
      });
    }
  }

  addMessage() {
    this.chatService.addMessage(this.chatId, this.newMessage).subscribe((res: ChatMessage) => {
      this.newMessage = null;
    });
  }

  closePreviousSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }

  subscribeToSocket() {
    this.socket = new WebSocket(environment.wsUrl);
    this.socket.onmessage = this.handleSocketMessage.bind(this);
  }

  handleSocketMessage(messageEvent: MessageEvent) {
    const message = <ChatMessage>JSON.parse(messageEvent.data);
    if (message.chat.id === this.chatId && !(message.id in this.messages.map(m => m.id))) {
      this.messages.push(message);
      this.scrollContainer();
    }
  }

  scrollContainer() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 10);
  }
}
