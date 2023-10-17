import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth.interface';
import { CerateUserDto } from './dto/create-user.dto';
import { IUserService } from 'src/users/user.interface';
import { instanceToPlain } from 'class-transformer';
import { AuthenticateGuard, LocalAuthGuard } from './roles.guard';
import { Request, Response } from 'express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CerateUserDto,
    @Res() res: Response,
  ) {
    return res.send({
      ...instanceToPlain(await this.userService.createUser(createUserDto)),
      status: 'ok',
    });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    return res.send({ status: 'ok' });
  }

  @Get('currentUser')
  @UseGuards(AuthenticateGuard)
  status(@Req() req: Request, @Res() res: Response) {
    return res.send({ data: instanceToPlain(req.user) });
  }

  @Post('logout')
  logout() {}
}
