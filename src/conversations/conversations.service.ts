import { Participant, User } from 'src/schemas';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationService } from './conversation.interface';
import { CreateConversationParam } from 'src/utils/types';
import { ConversationRepository } from './conversation.repository';
import { Services } from 'src/utils/constants';
import { IParticipantsService } from 'src/participants/participants.interface';
import { IUserService } from 'src/users/user.interface';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    @Inject(Services.PARTICIPANTS)
    private readonly participantService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createConversation(
    user: User,
    createConversation: CreateConversationParam,
  ) {
    const participants: Participant[] = [];

    const author = await this.userService.findUser({ id: user.id });

    if (!author.participant) {
      const participant = await this.createPraticipantAndSaveUser(
        author,
        createConversation.authorId,
      );
      participants.push(participant);
    } else {
      participants.push(author.participant);
    }

    const recipient = await this.userService.findUser({
      id: createConversation.recipientId,
    });

    if (!recipient) {
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    }

    if (!recipient.participant) {
      const participant = await this.createPraticipantAndSaveUser(
        recipient,
        createConversation.recipientId,
      );
      participants.push(participant);
    } else {
      participants.push(recipient.participant);
    }
    return await this.conversationRepository.create(null, { participants });
  }

  private async createPraticipantAndSaveUser(user: User, id: number) {
    const newParticipant = await this.participantService.createPraticipant({
      id,
    });

    user.participant = newParticipant;

    await this.userService.saveUser(user);

    return newParticipant;
  }
}
