import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const authorizationValue: string[] =
      request.headers['authorization'].split(' ');
    if (authorizationValue.length === 2 && authorizationValue[0] === 'Bearer') {
      return authorizationValue[1];
    } else {
      return null;
    }
  },
);
