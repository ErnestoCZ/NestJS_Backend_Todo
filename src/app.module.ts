import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Ernesto',
      password: 'ErnestoToDo',
      entities: [User, Todo],
      synchronize: true,
      retryDelay: 5000,
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
