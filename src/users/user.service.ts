import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IUserService } from './interface.user';
import { CreateUser, FindUser } from '../utils/types';
import { Helpers } from 'src/utils/helpers';
import { UserRepository } from './user.repository';
import { User } from 'src/schemas';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUser) {
    const exitsUser = await this.userRepository.findOne({ email: user.email });
    if (exitsUser) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }

    const password = await Helpers.encryptPassword(user.password);
    return this.userRepository.create(user, { ...user, password });
  }

  async findUser(findUser: FindUser): Promise<User> {
    return this.userRepository.findOne(findUser);
  }
}
