import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

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

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  @Get()
  findByEmail(@Param('email') email: string) {
    return this.userService.find(email);
  }
}
