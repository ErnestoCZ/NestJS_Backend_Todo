import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { JWTObject, validateJWT } from 'src/models/JWTValidation';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateTodoDto } from './dtos/createTodo.dto';

@Injectable()
export class TodosService {
  private JWTSecret: string;
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    this.JWTSecret = this.configService.get<string>('JWT_SECRET');
  }

  async findAllTodosByUserId(userId: string) {
    const foundUser: User = await this.userService.findOne(userId);

    if (foundUser) {
      const foundTodosByUserId: Todo[] = await this.repo.find({
        where: { user: foundUser },
      });
      return foundTodosByUserId;
    } else {
      throw new NotFoundException('Invalid User');
    }
  }

  async removeTodo(todoId: string) {
    const foundTodo = await this.repo.findOneBy({ id: todoId });

    if (foundTodo) {
      const response = this.repo.remove(foundTodo);
      return response;
    } else {
      throw new Error('Failed to remove todo');
    }
  }

  async findTodoById(id: string) {
    console.log(Number(id));
    const foundTodo: Todo = await this.repo.findOne({ where: { id: id } });
    if (foundTodo) {
      return foundTodo;
    } else {
      throw new NotFoundException(id);
    }
  }

  async findAll() {
    const todos: Todo[] = await this.repo.find({});
    if (todos.length > 0) {
      return todos;
    } else {
      return new NotFoundException('no todos found');
    }
  }
  async createTodoByUserId(title, description, session: Record<string, any>) {
    const decodedJWTPayload = jwt.verify(session.JWT, this.JWTSecret, {
      complete: true,
    });

    const validatedJWT: JWTObject = validateJWT(decodedJWTPayload);

    console.log(`${validatedJWT.id}`);
    const foundUser = await this.userService.findOne(validatedJWT.id);

    if (foundUser) {
      const newTodo: Partial<Todo> = this.repo.create({
        title,
        description,
        user: foundUser,
      });
      const result = await this.repo.save(newTodo);
      return result;
    } else {
      throw new BadRequestException('');
    }
  }

  async createTodo(userId, newTodo: CreateTodoDto) {
    const foundUser: User = await this.userService.findOne(userId);

    const createdTodo = await this.repo.create({
      title: newTodo.title,
      description: newTodo.description,
      user: foundUser,
    });

    if (createdTodo) {
      await this.repo.save(createdTodo);
      return createdTodo;
    } else {
      throw new Error('Failed to create new Todo');
    }
  }

  async deleteTodoById(todoId: string, auth: string) {
    const token = jwt.verify(auth.split(' ')[1], this.JWTSecret, {
      complete: true,
    });
    const validatedToken = validateJWT(token);
    const foundUser = await this.userService.findOne(validatedToken.id);

    if (foundUser) {
      const foundTodo = await this.repo.find({
        where: { id: todoId, user: foundUser },
      });
      if (foundTodo.length === 1) {
        const result = await this.repo.delete(foundTodo[0]);
        return result;
      } else {
        throw new Error('Todo not found!');
      }
    } else {
      throw new Error('Not allowed to delete this todo');
    }
  }
}
