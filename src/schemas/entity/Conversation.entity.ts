import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Participant } from './Participant.entity';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  // @Column()
  // authorId: number;

  // @Column()
  // recipientId: number;

  // @Column()
  // createBy: number;

  @ManyToMany(() => Participant, (participant) => participant.conversations)
  participants: Participant[];
}
