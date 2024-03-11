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
  shareNote,
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
import { ShareDialog } from "./share-dialoag";
import { NoteAccessLevel } from "notekraft/types/note-access";

export function NotesEditor() {
  //for note crud
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  //For sharing
  const [historyController, showHistoryController] = useState(false);
  const [shareDialog, showShareDialog] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareEmail, setShareEmail] = useState<string>();
  const [shareAccess, setShareAccess] = useState<NoteAccessLevel>();

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

  const handleShareClick = async () => {
    showShareDialog(true);
  };

  /**
   * Calls share endpoint
   */
  const handleShare = async () => {
    try {
      setShareLoading(true);
      const { _id } = selectedNote;
      await shareNote(shareEmail!, _id, shareAccess!);
      toast({
        title: `Shared successfully`,
      });
    } catch (error) {
      toast({
        title: `Failed to share note, ${(error as any).message}`,
        variant: "destructive",
      });
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div className="h-full">
      <NoteEditorHeader
        noteId={selectedNote?._id}
        title={selectedNote?.title}
        accessLevel={selectedNote.accessLevel}
        handleNoteSave={handleNoteSave}
        handleDelete={handleDelete}
        titleChange={titleChange}
        saving={saving}
        deleting={deleting}
        handleVersionClick={handleVersionClick}
        handleShareClick={handleShareClick}
      />
      <QuillEditor
        onEditorChange={onEditorChange}
        content={selectedNote?.content ?? ""}
        accessLevel={selectedNote.accessLevel}
      />
      <VersionControl
        noteId={selectedNote._id}
        historyController={historyController}
        showHistoryController={showHistoryController}
        handleVersionRevert={handleVersionRevert}
      />

      <ShareDialog
        noteId={selectedNote._id}
        shareDialog={shareDialog}
        showShareDialog={showShareDialog}
        handleShare={handleShare}
        shareLoading={shareLoading}
        setShareEmail={setShareEmail}
        setShareAccess={setShareAccess}
      />
    </div>
  );
}
