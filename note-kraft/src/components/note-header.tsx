import { FC, memo } from "react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FaRegSave } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { GrRevert } from "react-icons/gr";
import { FaRegShareSquare } from "react-icons/fa";
import { NoteAccessLevel } from "notekraft/types/note-access";

/**
 * Note header component
 */
const NoteEditorHeader: FC<{
  accessLevel: NoteAccessLevel;
  noteId: string;
  title: string;
  titleChange: Function;
  handleNoteSave: Function;
  handleDelete: Function;
  handleVersionClick: Function;
  handleShareClick: Function;
  saving: boolean;
  deleting: boolean;
}> = memo(
  ({
    noteId,
    title,
    accessLevel,
    titleChange,
    handleNoteSave,
    saving,
    handleDelete,
    deleting,
    handleVersionClick,
    handleShareClick,
  }) => {
    return (
      <>
        <div className="px-4 py-2 flex flex-row justify-between items-center">
          <input
            type="text"
            placeholder="New note title here"
            className="text-xl font-bold border-none outline-none w-full mx-2" // Remove border and outline
            value={title}
            onChange={(event) => titleChange(event.target.value)}
            disabled={accessLevel === NoteAccessLevel.VIEWER}
          />
          <div className="flex flex-row space-x-2">
            <Button
              variant={"outline"}
              onClick={() => {
                handleVersionClick();
              }}
              disabled={!noteId || accessLevel === NoteAccessLevel.VIEWER}
            >
              <GrRevert />
            </Button>

            <Button
              variant={"outline"}
              onClick={() => {
                handleShareClick();
              }}
              disabled={
                !noteId ||
                accessLevel === NoteAccessLevel.EDITOR ||
                accessLevel === NoteAccessLevel.VIEWER
              }
            >
              <FaRegShareSquare />
            </Button>

            <Button
              variant={"outline"}
              onClick={() => {
                handleDelete();
              }}
              disabled={
                deleting || !noteId || accessLevel === NoteAccessLevel.VIEWER
              }
            >
              {deleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              <AiOutlineDelete color="red" />
            </Button>

            <Button
              onClick={() => {
                handleNoteSave();
              }}
              disabled={saving || accessLevel === NoteAccessLevel.VIEWER}
            >
              {saving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Save Note
              <FaRegSave className="ml-2" />
            </Button>
          </div>
        </div>
        <Separator />
      </>
    );
  }
);

NoteEditorHeader.displayName = "NoteEditorHeader";

export default NoteEditorHeader;
