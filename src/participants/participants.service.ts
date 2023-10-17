import { Inject, Injectable } from '@nestjs/common';
import { IParticipantsService } from './participants.interface';
import { Participant } from 'src/schemas';
import { ParticipantRepository } from './participants.repository';
import { Services } from 'src/utils/constants';
import { CreatePraticipantParam, FindParticipantParam } from 'src/utils/types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async findParticipant(
    findParticipantParam: FindParticipantParam,
  ): Promise<Participant | null> {
    return await this.participantRepository.findOne(findParticipantParam);
  }

  async createPraticipant(
    createPraticipantParam: CreatePraticipantParam,
  ): Promise<Participant> {
    return await this.participantRepository.create(createPraticipantParam);
  }
}
