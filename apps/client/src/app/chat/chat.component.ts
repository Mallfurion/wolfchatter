import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { environment } from '@wolfchat/client-env';
import { Observable, Subscription } from 'rxjs';

import { ChatService } from '../shared/chat.service';
import { ChatMessage } from '../shared/models/message';
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'wolfchatter-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @Input() chatId: number;
  messages: ChatMessage[] = [];
  newMessage: string;
  subscription: Subscription;

  constructor(private chatService: ChatService, private socketService: SocketService) {
    
  }
  @ViewChild('messagesContainer') messagesContainer: ElementRef;

  ngOnChanges(): void {
    if (this.chatId) {
      this.messages = [];
      this.chatService.getMessages(this.chatId).subscribe((messages: ChatMessage[]) => {
        this.messages = messages;
        this.scrollContainer();
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.socketService.getChatMessageNotifications(this.chatId).subscribe((message: ChatMessage) => {
          if (!(message.id in this.messages.map(m => m.id))) {
            this.messages.push(message);
            this.scrollContainer();
          }
        })
      });

    }
  }

  addMessage() {
    this.chatService.addMessage(this.chatId, this.newMessage).subscribe((res: ChatMessage) => {
      this.newMessage = null;
    });
  }

  scrollContainer() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 10);
  }
}
