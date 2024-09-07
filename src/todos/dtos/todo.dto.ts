import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class TodoDto {
  @Expose()
  id: string;

  @Exclude()
  user: User;
}
