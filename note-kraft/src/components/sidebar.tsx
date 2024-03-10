"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { AvatarComponent } from "./avatar";
import { NotesList } from "./notes-list";
import { signOut, useSession } from "next-auth/react";
import { getNotes } from "notekraft/services/notes-service";
import { useEffect, useState } from "react";
import { Note } from "notekraft/types/note";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // const [notes, setNotes] = useState<Note[]>();
  const [isError, setError] = useState("");

  const notesState = useSelector((state: any) => state.notes);
  const { selectedNote } = useSelector((state: any) => state.selectedNote);

  const dispatch = useDispatch();

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

  /**
   * Navigates to specific note page
   * @param id Note id
   */
  const noteClick = (note: Note) => {
    dispatch(setSelectedNote(note));
  };

  const createNewNote = () => {
    dispatch(clearSelectedNote());
    // router.push(`/notes`);
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
          {/* <Button variant={"outline"}>
            Save Note
            <FaRegSave className="ml-2" />
          </Button> */}
          {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /> */}
          {/* <Input placeholder="Search" className="pl-8" /> */}
        </div>
      </div>
      <div className="m-0 h-full">
        {!isError ? (
          <NotesList
            notes={notesState.notes}
            noteClick={noteClick}
            selectedNoteId={selectedNote?._id ?? ""}
          />
        ) : (
          <div>{isError}</div>
        )}
      </div>
    </div>
  );
}
