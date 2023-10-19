import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from 'src/utils/constants';
import { Conversation } from 'src/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './conversation.repository';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UserModule],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
    ConversationRepository,
  ],
})
export class ConversationModule {}
