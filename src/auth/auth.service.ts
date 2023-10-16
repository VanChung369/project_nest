import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './interface.auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/interface.user';
import { LoginUser } from 'src/utils/types';
import { Helpers } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}
  async validateUser(loginUser: LoginUser) {
    const user = await this.userService.findUser({ email: loginUser.email });
    if (!user) {
      throw new HttpException('Invalid User', HttpStatus.UNAUTHORIZED);
    }

    const validPassword = await Helpers.comparePassword(
      loginUser.password,
      user.password,
    );
    return validPassword;
  }
}
