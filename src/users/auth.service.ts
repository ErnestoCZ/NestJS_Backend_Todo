import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import bcrypt from 'bcrypt';

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

  signin(email: string, password: string) {}
}
