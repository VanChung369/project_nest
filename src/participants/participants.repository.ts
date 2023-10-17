import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { Participant } from 'src/schemas';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantRepository extends BaseRepository<
  Participant,
  Repository<Participant>
> {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {
    super(participantRepository);
  }
}
