import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { TodosService } from './todos.service';
import { TodoInterceptor } from './interceptors/todo.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(new AuthGuard())
@UseInterceptors(new TodoInterceptor())
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
  deleteTodo(
    @Param('id') todoUUID: string,
    @Headers('authorization') auth: string,
  ) {
    return this.todoService.deleteTodoById(todoUUID, auth);
  }

  // @Post('/create')
  // createTodo(
  //   @Body() body: CreateTodoDto,
  //   @Session() session: Record<string, any>,
  // ) {
  //   return this.todoService.createTodoByUserId(
  //     body.title,
  //     body.description,
  //     session,
  //   );
  // }

  @Post('/create/:userId')
  createTodoByUser(@Param('userId') userId, @Body() body: CreateTodoDto) {
    console.log(body);
    return this.todoService.createTodo(userId, body);
  }

  @Get('/user/:userid')
  getTodosByUserId(@Param('userid') userId: string) {
    return this.todoService.findAllTodosByUserId(userId);
  }
}
