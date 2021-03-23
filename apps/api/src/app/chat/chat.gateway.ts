// import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

import { SocketService } from './socket.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() public server: Server;
  // logger: Logger = new Logger();

  constructor(private socketService: SocketService) { }

  afterInit(server: Server) {
    this.socketService.server = server;
  }
}
