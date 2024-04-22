import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  providers: [TodosService],
  exports: [TodosService],
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
})
export class TodosModule {}
