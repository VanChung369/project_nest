import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/interface.user';
import { User } from 'src/schemas';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(Services.USERS) private userService: IUserService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const exitsUser = await this.userService.findUser({ id: user.id });
    return exitsUser ? done(null, exitsUser) : done(null, null);
  }
}
