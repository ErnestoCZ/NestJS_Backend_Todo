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
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    private userService: UsersService,
  ) {}

  findAllTodosByUserId() {}

  removeTodo() {}

  async findTodoById(id: string) {
    console.log(Number(id));
    const foundTodo: Todo = await this.repo.findOne({ where: { id: id } });
    if (foundTodo) {
      console.log(foundTodo);
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
    const decodedJWTPayload = jwt.verify(session.JWT, 'Secret', {
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

  async deleteTodoById(id: string) {
    const foundTodo: Todo = await this.findTodoById(id);

    if (foundTodo) {
      return await this.repo.remove(foundTodo);
    } else {
      throw new NotFoundException();
    }
  }
}
