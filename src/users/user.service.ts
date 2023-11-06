import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IUserService } from './user.interface';
import { CreateUser, FindUser, FindUserByName } from '../utils/types';
import { Helpers } from 'src/utils/helpers';
import { UserRepository } from './user.repository';
import { User } from 'src/schemas';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUser) {
    const exitsUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (exitsUser) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }

    const password = await Helpers.encryptPassword(user.password);
    return this.userRepository.create(null, { ...user, password });
  }

  async findUser(findUser: FindUser): Promise<User> {
    return this.userRepository.findOne(findUser);
  }

  async findUserByName(findUser: FindUserByName): Promise<User> {
    return this.userRepository.findOne(findUser);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.saveUser(user);
  }
}
