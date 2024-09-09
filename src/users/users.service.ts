import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User, 'DB') private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async find(email: string) {
    const result: User[] = await this.repo.find({ where: { email } });
    return result;
  }
  async findOne(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }
  update() {}
  delete() {}
}
