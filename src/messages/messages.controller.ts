import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/schemas';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() createMessage: CreateMessageDto,
    @Res() res: Response,
  ) {
    const mgs = await instanceToPlain(
      this.messageService.createMessage({ ...createMessage, user }),
    );
    this.eventEmitter.emit('message.create', mgs);
    return res.send({
      status: 'ok',
    });
  }

  @Get(':id')
  async getMessageConversationById(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Res() res: Response,
  ) {
    return res.send({
      data: instanceToPlain(
        await this.messageService.getMessageConversationById(conversationId),
      ),
    });
  }

  @Delete('id')
  async deleteMessageConversationById(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
  ) {}
}
