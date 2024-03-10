"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "./quill-editor";
import { setNotes } from "notekraft/utils/redux/reducers/notes";
import NoteEditorHeader from "./note-header";
import {
  deleteNote,
  getNotes,
  saveNote,
} from "notekraft/services/notes-service";
import { toast } from "./ui/use-toast";
import {
  clearSelectedNote,
  setSelectedNote,
  setSelectedNoteContent,
  setSelectedNoteTitle,
} from "notekraft/utils/redux/reducers/selected-note";
import VersionControl from "./version-control";
import { Note, NoteHistory } from "notekraft/types/note";

export function NotesEditor() {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [historyController, showHistoryController] = useState(false);

  const { selectedNote } = useSelector((state: any) => state.selectedNote);
  const dispatch = useDispatch();

  /**
   * Handles editor content change event.
   * @param htmlString HTML content of the editor
   */
  const onEditorChange = (htmlString: string): void => {
    dispatch(setSelectedNoteContent(htmlString));
  };

  /**
   * Handles title changes
   * @param newTitle
   */
  const titleChange = (newTitle: string): void => {
    dispatch(setSelectedNoteTitle(newTitle));
  };

  /**
   * Handles title changes
   */
  const handleNoteSave = async () => {
    try {
      setSaving(true);
      const { _id, title, content } = selectedNote;

      if (!title) {
        toast({ title: "Title is required to save", variant: "destructive" });
        return;
      }

      const note = await saveNote(title, content, _id);

      dispatch(setSelectedNote(note));
      await refreshNotesList();
    } catch {
      toast({ title: "Failed to save note", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handles title changes
   */
  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { _id } = selectedNote;
      await deleteNote(_id);

      await refreshNotesList();
      dispatch(clearSelectedNote());
    } catch {
      toast({ title: "Failed to delete note", variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  const refreshNotesList = async () => {
    const notes = await getNotes();
    dispatch(setNotes(notes));
  };

  /**
   * Show revert version sheet
   */
  const handleVersionClick = () => {
    showHistoryController(true);
  };

  /**
   * Revert note
   * @param noteHistory History note
   */
  const handleVersionRevert = (noteHistory: NoteHistory) => {
    const note: Note = { ...noteHistory, _id: noteHistory.parentNote };
    dispatch(setSelectedNote(note));
    showHistoryController(false);
  };

  return (
    <div className="h-full">
      <NoteEditorHeader
        handleNoteSave={handleNoteSave}
        handleDelete={handleDelete}
        title={selectedNote?.title}
        titleChange={titleChange}
        saving={saving}
        deleting={deleting}
        handleVersionClick={handleVersionClick}
      />
      <QuillEditor
        onEditorChange={onEditorChange}
        content={selectedNote?.content ?? ""}
      />
      <VersionControl
        noteId={selectedNote._id}
        historyController={historyController}
        showHistoryController={showHistoryController}
        handleVersionRevert={handleVersionRevert}
      />
    </div>
  );
}
