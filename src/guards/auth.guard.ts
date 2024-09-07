import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const ctx: string[] = request.headers['authorization'].split(' ');
    console.log(ctx[1], 'Guard');
    if (ctx[0] !== 'Bearer')
      // throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      return false;
    else {
      const JWTPayload: jwt.JwtPayload | string = jwt.verify(ctx[1], 'Secret', {
        complete: false,
      });
      if (JWTPayload) {
        console.log(JWTPayload);
        return true;
      } else {
        return false;
      }
    }
  }
}
