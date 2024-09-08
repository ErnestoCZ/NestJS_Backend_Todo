import { IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @IsOptional()
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
