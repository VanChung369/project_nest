import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebSocket implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client);
    client.emit('connected', { status: 'ok' });
  }
  @WebSocketServer()
  servver: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('createMessage');
  }

  @OnEvent('message.create')
  handleOrderCreatedEvent(payload: any) {
    this.servver.emit('onMessage', payload);
  }
}
