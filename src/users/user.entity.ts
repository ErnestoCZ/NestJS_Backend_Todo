import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from 'src/todos/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
