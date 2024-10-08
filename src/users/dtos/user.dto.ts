import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;
}
