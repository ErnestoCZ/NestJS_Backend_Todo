import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWTObject, validateJWT } from 'src/models/JWTValidation';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //check email already in use?
    const result: User[] = await this.userService.find(email);
    if (result.length > 0) {
      throw new BadRequestException('Email already in use');
    }
    const hash: string = bcrypt.hashSync(password, 10);
    //if email not in use encrypt password

    //create user in DB with encrypted password
    return await this.userService.create(email, hash);
  }

  async signin(email: string, password: string, session: Record<string, any>) {
    const foundUser: User[] = await this.userService.find(email);
    if (foundUser.length === 0) {
      throw new UnauthorizedException('Email/User not found');
    }

    const accessEnabled = bcrypt.compareSync(password, foundUser[0].password);

    if (accessEnabled) {
      const token = jwt.sign({ id: foundUser[0].id }, 'Secret', {
        expiresIn: '1h',
      });

      if (token) {
        session.JWT = token;
      }
      return JSON.stringify({ JWT: token });
    } else {
      throw new BadRequestException('Wrong password!');
    }
  }

  async signout(session: Record<string, any>) {
    if (session.JWT) {
      const JWTData: jwt.Jwt | null = jwt.decode(session.JWT, {
        complete: true,
      });
      const JWTPayload: JWTObject = validateJWT(JWTData);
      const user: User = await this.userService.findOne(JWTPayload.id);
      session.JWT = null;
      return user;
    }
    session.JWT = null;
  }
}
