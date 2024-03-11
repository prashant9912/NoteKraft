import { NoteWithAccessDTO } from "notekraft/types/dtos/note-access-dto";
import { Note } from "notekraft/types/note";

/**
 * Transform nnote with access DTO to flat note object
 * @param noteWithAccessList Notes with access list
 * @returns list of notes
 */
export function transformNoteWithAccessListToNoteList(
  noteWithAccessList: NoteWithAccessDTO[]
): Note[] {
  return noteWithAccessList
    .filter((noteAccess) => noteAccess.note)
    .map((noteWithAccess) => {
      const { note, user, accessLevel } = noteWithAccess;

      const transformedNote: Note = {
        _id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        user: user,
        accessLevel: accessLevel,
      };

      return transformedNote;
    });
}
