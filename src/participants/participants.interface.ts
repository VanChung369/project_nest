import { Participant } from 'src/schemas';
import { CreatePraticipantParam, FindParticipantParam } from 'src/utils/types';

export interface IParticipantsService {
  findParticipant(
    findParticipantParam: FindParticipantParam,
  ): Promise<Participant | null>;

  createPraticipant(
    createPraticipantParam: CreatePraticipantParam,
  ): Promise<Participant>;
}
