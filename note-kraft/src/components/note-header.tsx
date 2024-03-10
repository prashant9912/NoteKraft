import { FC, memo } from "react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FaRegSave } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AiOutlineDelete } from "react-icons/ai";

/**
 * Note header component
 */
const NoteEditorHeader: FC<{
  title: string;
  titleChange: Function;
  handleNoteSave: Function;
  handleDelete: Function;
  saving: boolean;
  deleting: boolean;
}> = memo(
  ({ title, titleChange, handleNoteSave, saving, handleDelete, deleting }) => {
    return (
      <>
        <div className="px-4 py-2 flex flex-row justify-between items-center">
          <input
            type="text"
            placeholder="New note title here"
            className="text-xl font-bold border-none outline-none w-full mx-2" // Remove border and outline
            value={title}
            onChange={(event) => titleChange(event.target.value)}
          />
          <div className="flex flex-row space-x-2">
            <Button
              variant={"outline"}
              onClick={() => {
                handleDelete();
              }}
              disabled={deleting}
            >
              {deleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              <AiOutlineDelete />
            </Button>

            <Button
              onClick={() => {
                handleNoteSave();
              }}
              disabled={saving}
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
