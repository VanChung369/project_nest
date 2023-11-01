import { Module } from '@nestjs/common';
import { WebSocket } from './gateway.websocket';

@Module({ providers: [WebSocket] })
export class GatewayModule {}
