import { BaseEntity } from 'src/base/base.entity';
import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: User;
}
