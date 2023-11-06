import { Message } from 'src/schemas';
import { CreateMessageParam, DeleteMessageParam } from 'src/utils/types';

export interface IMessageService {
  createMessage(createMessage: CreateMessageParam): Promise<Message>;
  getMessageConversationById(conversationId: number): Promise<Message[]>;
  deleteMessageConversationById(params: DeleteMessageParam);
}
