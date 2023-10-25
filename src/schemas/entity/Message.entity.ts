import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';
import { Conversation } from './Conversation.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.message)
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
