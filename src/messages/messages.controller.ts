import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/schemas';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessage: CreateMessageDto,
  ) {
    return instanceToPlain(
      this.messageService.createMessage({ ...createMessage, user }),
    );
  }
}
