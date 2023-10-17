import { User } from 'src/schemas';
import { CreateConversationParam } from 'src/utils/types';

export interface IConversationService {
  createConversation(
    user: User,
    createConversationParam: CreateConversationParam,
  );
}
