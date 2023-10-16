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
