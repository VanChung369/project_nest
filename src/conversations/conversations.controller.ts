import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/roles.guard';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversations.interface';
import { CerateConversationDto } from './dto/create-conversation.dto';
import { User } from 'src/schemas';
import { AuthUser } from 'src/utils/decorators';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversation: CerateConversationDto,
  ) {
    const conversation = instanceToPlain(
      this.conversationService.createConversation(user, createConversation),
    );

    this.eventEmitter.emit('conversation.create', conversation);

    return conversation;
  }

  @Get()
  async getConversations(@AuthUser() user: User, @Res() res: Response) {
    return res.send({
      data: await this.conversationService.getConversations(user.id),
    });
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    return instanceToPlain(
      await this.conversationService.findConversationById(id),
    );
  }
}
