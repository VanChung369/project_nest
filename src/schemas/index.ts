import { DataSource } from 'typeorm';
import { Session } from './entity/Session.entity';
import { User } from './entity/User.entity';
import 'dotenv/config';
import { Conversation } from './entity/Conversation.entity';
import { Participant } from './entity/Participant.entity';

export const mysqlDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Session, Conversation, Participant],
  synchronize: true,
  logging: 'all',
});

export { User, Session, Conversation, Participant };
