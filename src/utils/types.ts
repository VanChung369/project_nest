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
  email: string;
}>;

export type CreateConversationParam = {
  authorId: number;
  recipientId: number;
  message: string;
};

export type ConversationIndentityType = 'author' | 'recipient';

export interface AuthenticateRequest extends Request {
  user: User;
}
export type FindParticipantParam = Partial<{
  id: number;
}>;

export type CreatePraticipantParam = {
  id: number;
};
