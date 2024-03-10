import { User } from "../user";

export type UserLoginDTO = {
  user: User;
  token: string;
  error?: string;
};
