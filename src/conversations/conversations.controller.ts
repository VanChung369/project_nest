import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/roles.guard';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversation.interface';
import { CerateConversationDto } from './dto/create-conversation.dto';
import { User } from 'src/schemas';
import { AuthUser } from 'src/utils/decorators';

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
    return this.conversationService.createConversation(
      user,
      createConversation,
    );
  }
}
