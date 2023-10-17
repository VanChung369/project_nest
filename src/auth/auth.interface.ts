import { LoginUser } from '../utils/types';
export interface IAuthService {
  validateUser(loginUser: LoginUser);
}
