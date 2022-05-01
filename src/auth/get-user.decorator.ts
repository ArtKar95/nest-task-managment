import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const GetUserDecorator = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req', req);
    return req.user;
  },
);
