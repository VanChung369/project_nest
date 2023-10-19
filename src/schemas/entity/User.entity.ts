import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Conversation } from './Conversation.entity';

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
}
