import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTodoDto } from './Dtos/createTodo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}
  @Get('/')
  findAllTodos() {
    return this.todoService.findAll();
  }

  @Get('/:id')
  findTodo(@Param('id') uuid: string) {
    return this.todoService.findTodoById(uuid);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') uuid: string) {
    return this.todoService.deleteTodoById(uuid);
  }

  @Post('/create')
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.createTodo(body.title, body.description);
  }
}
