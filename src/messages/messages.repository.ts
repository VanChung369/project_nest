import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { Message } from 'src/schemas';
import { Repository } from 'typeorm';

@Injectable()
export class MessageRepository extends BaseRepository<
  Message,
  Repository<Message>
> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
    super(messageRepository);
  }
}
