import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class SocketService {
 public server: Server = null;

 sendMessage(message: Message) {
    const payload = JSON.stringify({
      type: 'message',
      data: message
   });
    this.server.clients.forEach(c => c.send(payload));
 }

 sendChat(chat: Chat) {
    const payload = JSON.stringify({
       type: 'chat',
       data: chat
    });
    this.server.clients.forEach(c => c.send(payload));
 }
}