import { User } from 'src/schemas';

export type CreateUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type FindUser = Partial<{
  id?: number;
  email?: string;
}>;

export type FindUserByName = Partial<{
  lastName?: string;
}>;

export type CreateConversationParam = {
  username: string;
  message: string;
};

export type ConversationIndentityType = 'author' | 'recipient';

export interface AuthenticateRequest extends Request {
  user: User;
}

export type CreateMessageParam = {
  conversationId: number;
  content: string;
  user: User;
};

export type DeleteMessageParam = {
  userId: number;
  conversationId: number;
  messageId: number;
};
