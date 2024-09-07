import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private JWTSecret: string;
  constructor(private configService: ConfigService) {
    this.JWTSecret = this.configService.get<string>('JWT_SECRET');
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      request.session.JWT &&
      jwt.verify(request.session.JWT, this.JWTSecret)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
