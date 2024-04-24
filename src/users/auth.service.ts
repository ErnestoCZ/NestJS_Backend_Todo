import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //check email already in use?
    //TODO BUGFIX cannot read properties of undefined (reading "find")
    const result: User[] = await this.userService.find(email);
    if (result.length > 0) {
      throw new BadRequestException('Email already in use');
    }
    const hash: string = bcrypt.hashSync(password, 10);
    //if email not in use encrypt password

    //create user in DB with encrypted password
    return await this.userService.create(email, hash);
  }

  async signin(email: string, password: string, session: any) {
    const foundUser: User[] = await this.userService.find(email);
    if (foundUser.length === 0) {
      throw new NotFoundException('Email/User not found');
    }

    console.log(foundUser);
    const accessEnabled = bcrypt.compareSync(password, foundUser[0].password);

    if (accessEnabled) {
      session.id = foundUser[0].id;
      session.email = foundUser[0].email;
      return foundUser[0];
    } else {
      throw new BadRequestException('Wrong password!');
    }
  }

  signout(session: any) {
    session.id = null;
    session.email = null;
  }
}
