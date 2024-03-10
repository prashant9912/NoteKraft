import { User } from "../types/user";

/**
 * Note dto
 */
export type NoteDTO = {
  _id: string;
  title: string;
  content: string;
  user: User;
};
