import { Conversation, User } from 'src/schemas';
import { CreateConversationParam } from 'src/utils/types';

export interface IConversationService {
  createConversation(
    user: User,
    createConversationParam: CreateConversationParam,
  );

  getConversations(id: number): Promise<Conversation[]>;

  findConversationById(id: number): Promise<Conversation>;
}
