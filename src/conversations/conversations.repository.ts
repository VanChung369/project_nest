import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { Conversation } from 'src/schemas';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsRepository extends BaseRepository<
  Conversation,
  Repository<Conversation>
> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {
    super(conversationRepository);
  }

  async isCreatedConversation(userId: number, recipientId: number) {
    return this.conversationRepository.findOne({
      where: [
        {
          creator: { id: userId },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: userId },
        },
      ],
    });
  }

  async getConversations(id: number) {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoin('conversation.recipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
      ])
      .where('creator.id', { id })
      .orWhere('recipient.id', { id })
      .orderBy('conversation.id', 'DESC')
      .getMany();
  }
}
