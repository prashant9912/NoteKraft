import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { getNotesHistory } from "notekraft/services/notes-service";
import { NoteHistory } from "notekraft/types/note";
import { NotesList } from "./notes-list";

function VersionControl({
  noteId,
  historyController,
  showHistoryController,
  handleVersionRevert,
}: {
  noteId: string;
  historyController: boolean;
  showHistoryController: Function;
  handleVersionRevert: Function;
}) {
  const [notesHistory, setHistory] = useState<NoteHistory[]>();

  const setNotesHistory = async () => {
    setHistory(await getNotesHistory(noteId));
  };

  useEffect(() => {
    if (historyController) {
      setNotesHistory();
    }
  }, [historyController]);

  return (
    <Sheet
      open={historyController}
      onOpenChange={(value) => {
        showHistoryController(value);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Revert Version</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div>
          <NotesList notes={notesHistory} noteClick={handleVersionRevert} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default VersionControl;
