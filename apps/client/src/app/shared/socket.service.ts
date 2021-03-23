import { Injectable } from "@angular/core";
import { environment } from "@wolfchat/client-env";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { Chat } from "./models/chat";
import { ChatMessage } from "./models/message";

@Injectable({
    providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket;
  private messageSubject$: BehaviorSubject<ChatMessage> = new BehaviorSubject(null);
  private chatSubject$: BehaviorSubject<Chat> = new BehaviorSubject(null);

  constructor() {
    this.socket = new WebSocket(`${environment.wsUrl}`);
    this.socket.onopen = () => {
      this.socket.onmessage = this.handleSocketMessage.bind(this);
    }
  }

  public getChatMessageNotifications(chatId: number) {
    return this.messageSubject$.asObservable().pipe(
      filter(m => m !== null),
      filter((m: ChatMessage) => m?.chat?.id === chatId),
    );
  }

  public getChatNotifications() {
    return this.chatSubject$.asObservable().pipe(
      filter(m => m !== null),
    );
  }

  private handleSocketMessage(messageEvent: MessageEvent) {
    const payload = JSON.parse(messageEvent.data);
    // ChatMessage
    if (payload.type === 'message') {
      const message = <ChatMessage>payload.data;
      this.messageSubject$.next(message);
    }
    if (payload.type === 'chat') {
      const chat = <Chat>payload.data;
      this.chatSubject$.next(chat);
    }

  }
}