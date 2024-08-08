import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.session.JWT) {
      const decoded = jwt.verify(request.session.JWT, 'Secret');
      console.log(`${decoded}`);
      return true;
    } else {
      return false;
    }
  }
}
