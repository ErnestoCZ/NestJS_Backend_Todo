import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Todo } from 'src/todos/todo.entity';

it(' can create an instance of authservice', async () => {
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUserService,
        useClass: Todo,
      },
    ],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
