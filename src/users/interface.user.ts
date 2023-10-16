import { User } from 'src/schemas';
import { CreateUser, FindUser } from 'src/utils/types';

export interface IUserService {
  createUser(user: CreateUser): Promise<User>;
  findUser(findUser: FindUser): Promise<User>;
}
