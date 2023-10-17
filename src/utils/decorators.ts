import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthenticateRequest } from './types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenticateRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);
