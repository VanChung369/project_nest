import { User } from 'src/schemas';
import { CreateUser, FindUser, FindUserByName } from 'src/utils/types';

export interface IUserService {
  createUser(user: CreateUser): Promise<User>;
  findUser(findUser: FindUser): Promise<User>;
  saveUser(user: User): Promise<User>;
  findUserByName(findUser: FindUserByName): Promise<User>;
}
