import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { User } from 'src/schemas';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User, Repository<User>> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }
}
