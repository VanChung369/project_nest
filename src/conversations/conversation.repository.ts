import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { Conversation } from 'src/schemas';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationRepository extends BaseRepository<
  Conversation,
  Repository<Conversation>
> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {
    super(conversationRepository);
  }
}
