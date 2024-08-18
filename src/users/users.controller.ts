import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersInterceptor } from './interceptors/users.interceptor';

@UseInterceptors(new UsersInterceptor())
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  loginUser(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.signin(body.email, body.password, session);
  }

  @Post('/signout')
  signoutUser(@Session() session: Record<string, any>) {
    return this.authService.signout(session);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Get()
  findByEmail(@Param('email') email: string) {
    return this.userService.find(email);
  }
}
