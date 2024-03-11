import { Note } from "../note";
import { NoteAccessLevel } from "../note-access";
import { User } from "../user";

/**
 * Note with access
 */
export type NoteWithAccessDTO = {
  note: Note;
  user: User;
  accessLevel: NoteAccessLevel;
};
