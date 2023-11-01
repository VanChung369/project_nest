import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMessageService } from './message.interface';
import { Message } from 'src/schemas';
import { CreateMessageParam } from 'src/utils/types';
import { MessageRepository } from './messages.repository';
import { ConversationsRepository } from 'src/conversations/conversations.repository';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationsRepository,
  ) {}

  async createMessage(createMessage: CreateMessageParam): Promise<Message> {
    const conversation = await this.conversationRepository.findOne(
      {
        id: createMessage.conversationId,
      },
      ['creator', 'recipient'],
    );

    if (!conversation) {
      throw new HttpException('conversation not found', HttpStatus.NOT_FOUND);
    }

    if (
      conversation.creator.id !== createMessage.user.id &&
      conversation.recipient.id !== createMessage.user.id
    ) {
      throw new HttpException(
        'cannot creat message in this conversion',
        HttpStatus.FORBIDDEN,
      );
    }

    const saveMessage = await this.messageRepository.create(null, {
      content: createMessage.content,
      conversation,
      author: createMessage.user,
    });

    conversation.lastMessageSent = saveMessage;

    await this.conversationRepository.create(conversation);
    return saveMessage;
  }

  getMessageConversationById(conversationId: number): Promise<Message[]> {
    return this.messageRepository.findMessageConversation(conversationId);
  }
}
