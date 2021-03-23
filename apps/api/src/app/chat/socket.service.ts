import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { Message } from './entities/message.entity';

@Injectable()
export class SocketService {
 public server: Server = null;

 sendMessage(message: Message) {
    this.server.clients.forEach(c => c.send(JSON.stringify(message)));
 }
}