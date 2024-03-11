"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { AvatarComponent } from "./avatar";
import { NotesList } from "./notes-list";
import { signOut, useSession } from "next-auth/react";
import { getNotes } from "notekraft/services/notes-service";
import { useEffect } from "react";
import { Note } from "notekraft/types/note";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "notekraft/utils/redux/reducers/notes";
import { toast } from "./ui/use-toast";
import {
  clearSelectedNote,
  setSelectedNote,
} from "notekraft/utils/redux/reducers/selected-note";

export function Sidebar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const notesState = useSelector((state: any) => state.notes);
  const { selectedNote } = useSelector((state: any) => state.selectedNote);

  const fetchNotes = async () => {
    try {
      const notes = await getNotes();
      dispatch(setNotes(notes));
    } catch {
      toast({ title: "Failed to get notes", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const noteClick = (note: Note) => {
    dispatch(setSelectedNote(note));
  };

  const createNewNote = () => {
    dispatch(clearSelectedNote());
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">Note Kraft ✏️</h1>
        <div className="flex flex-row space-x-2">
          <ThemeSwitcher />
          <AvatarComponent signOut={signOut} email={session?.user.email} />
        </div>
      </div>
      <Separator />
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row justify-between">
          <Button variant={"outline"} onClick={createNewNote}>
            Create new note
            <MdAdd className="ml-2" />
          </Button>
        </div>
      </div>
      <div className="m-0 h-full">
        <NotesList
          notes={notesState.notes}
          noteClick={noteClick}
          selectedNoteId={selectedNote?._id ?? ""}
        />
      </div>
    </div>
  );
}
