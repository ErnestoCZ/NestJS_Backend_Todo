import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TodosService],
  exports: [TodosService],
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  controllers: [TodosController],
})
export class TodosModule {}
