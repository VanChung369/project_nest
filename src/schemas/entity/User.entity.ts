import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Conversation } from './Conversation.entity';
import { Message } from './Message.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  message: Message[];
}
