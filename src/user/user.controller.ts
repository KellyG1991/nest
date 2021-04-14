import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from '../utils/google/google.service';
import { UserService } from './model/user.service';

@Controller('google')
export class UserController {
  constructor(
    private googleStrategy: GoogleService,
    private userService: UserService,
  ) {}

  @Get('test')
  async hello() {
    return 'Hello World';
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    const profile = await this.googleStrategy.googleLogin(req);
    const user = await this.userService.createOne({ ...profile.user });

    return {
      status: HttpStatus.CREATED,
      userId: user._id,
    };
  }
}
