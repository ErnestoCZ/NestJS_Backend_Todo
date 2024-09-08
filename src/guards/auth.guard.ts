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
    if (ctx.length !== 2 || ctx[0] !== 'Bearer') {
      return false;
    } else {
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
