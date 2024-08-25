import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  Session,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { TodosService } from './todos.service';

//TODO insert a JWT in frontend before add Guard
// @UseGuards(new AuthGuard())
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
  createTodo(
    @Body() body: CreateTodoDto,
    @Session() session: Record<string, any>,
  ) {
    return this.todoService.createTodoByUserId(
      body.title,
      body.description,
      session,
    );
  }

  @Get('/user/:userid')
  getTodosByUserId(@Param('userid') userId: string) {
    return this.todoService.findAllTodosByUserId(userId);
  }
}
