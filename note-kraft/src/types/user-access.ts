import { NoteAccessLevel } from "./note-access";

/**
 * User access type
 */
export type UserAccess = {
  userEmail: string;
  accessLevel: NoteAccessLevel;
};
