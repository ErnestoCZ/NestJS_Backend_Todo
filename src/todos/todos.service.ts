import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { GeneratedMetadataArgs } from 'typeorm/metadata-args/GeneratedMetadataArgs';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

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
  async createTodo(title, description) {
    const newTodo: Partial<Todo> = this.repo.create({ title, description });

    if (newTodo) {
      const result = await this.repo.save(newTodo);
      return result;
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
