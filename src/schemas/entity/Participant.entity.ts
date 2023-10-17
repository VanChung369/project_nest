import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Conversation } from './Conversation.entity';

@Entity({ name: 'participants' })
export class Participant extends BaseEntity {
  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  @JoinTable()
  conversations: Conversation[];
}
