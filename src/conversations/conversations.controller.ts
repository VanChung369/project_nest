import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/roles.guard';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversation.interface';
import { CerateConversationDto } from './dto/create-conversation.dto';
import { User } from 'src/schemas';
import { AuthUser } from 'src/utils/decorators';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversation: CerateConversationDto,
  ) {
    return instanceToPlain(
      this.conversationService.createConversation(user, createConversation),
    );
  }

  @Get()
  getConversations(@AuthUser() user: User) {
    return this.conversationService.getConversations(user.id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    return instanceToPlain(
      await this.conversationService.findConversationById(id),
    );
  }
}
