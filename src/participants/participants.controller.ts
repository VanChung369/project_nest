import { Controller, Inject } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IParticipantsService } from './participants.interface';

@Controller(Routes.PARTICIPANTS)
export class ParticipantsController {
  constructor(
    @Inject(Services.PARTICIPANTS)
    private participantsService: IParticipantsService,
  ) {}
}
