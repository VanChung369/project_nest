import { BaseEntity } from 'src/base/base.entity';
import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Message } from './Message.entity';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: User;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: Message[];

  @OneToOne(() => Message)
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: Message;
}
