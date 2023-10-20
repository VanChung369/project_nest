import { Conversation, User } from 'src/schemas';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationService } from './conversations.interface';
import { CreateConversationParam } from 'src/utils/types';
import { ConversationsRepository } from './conversations.repository';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user.interface';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    private readonly conversationRepository: ConversationsRepository,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createConversation(
    user: User,
    createConversation: CreateConversationParam,
  ) {
    const { recipientId, message } = createConversation;

    const recipient = await this.userService.findUser({
      id: recipientId,
    });

    if (!recipient) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    if (user.id === recipient.id)
      throw new HttpException(
        'Cannot create Conversation with yourself',
        HttpStatus.BAD_REQUEST,
      );

    const exists = await this.conversationRepository.isCreatedConversation(
      user.id,
      recipient.id,
    );
    if (exists) throw new HttpException('user exits', HttpStatus.CONFLICT);

    return await this.conversationRepository.create(null, {
      creator: user,
      recipient: recipient,
    });
  }

  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepository.getConversations(id);
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne({ id });
  }
}
