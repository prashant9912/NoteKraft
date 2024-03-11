import { NoteAccessLevel } from "./note-access";
import { User } from "./user";

/**
 * Note entity for frontend application
 */
export type Note = {
  _id?: string;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
  accessLevel: NoteAccessLevel;
};

export type NoteHistory = Note & {
  parentNote?: string;
  lastChangedAt?: Date;
};
