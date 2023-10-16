import { DataSource } from 'typeorm';
import { Session } from './entity/Session.entity';
import { User } from './entity/User.entity';
import 'dotenv/config';

export const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Session],
  synchronize: true,
  logging: 'all',
});

export { User, Session };

export const entities = [User, Session];
