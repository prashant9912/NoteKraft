import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { getNoteAccessList } from "notekraft/services/notes-service";
import { UserAccess } from "notekraft/types/user-access";

interface ShareDialogInterface {
  shareDialog: boolean;
  showShareDialog: Function;
  handleShare: Function;
  shareLoading: boolean;
  setShareEmail: Function;
  setShareAccess: Function;
  noteId: string;
}
/**
 * Share dialog componet which allows user to share notes with others
 */
export function ShareDialog({
  noteId,
  shareDialog,
  showShareDialog,
  handleShare,
  shareLoading,
  setShareEmail,
  setShareAccess,
}: ShareDialogInterface) {
  const [userAccessList, setUserAccessList] = useState<UserAccess[]>();

  const fetchUserAccessList = async () => {
    setUserAccessList(await getNoteAccessList(noteId));
  };
  useEffect(() => {
    setShareEmail("");
    setShareAccess("");
    if (shareDialog && noteId) {
      fetchUserAccessList();
    }
  }, [shareDialog]);

  return (
    <Dialog open={shareDialog} onOpenChange={(value) => showShareDialog(value)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
          <DialogDescription>Share note with other user</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            id="email"
            onChange={(e) => setShareEmail(e.target.value)}
            placeholder="User email"
            className="col-span-3"
          />
          <Select onValueChange={(value) => setShareAccess(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select share option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="editor">Edit & View</SelectItem>
              <SelectItem value="viewer">Only View</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={async () => {
              await handleShare();
              fetchUserAccessList();
            }}
            disabled={shareLoading}
          >
            {shareLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Share
          </Button>

          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <SharedUserList userAccessList={userAccessList ?? []} />
          </ScrollArea>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SharedUserList({ userAccessList }: { userAccessList: UserAccess[] }) {
  return (
    <div className="space-y-2">
      {userAccessList.map((userAccess, index) => (
        <div
          key={index}
          className="py-2 px-4 rounded-md border flex flex-row justify-between"
        >
          <p>{userAccess.userEmail}</p>
          <p>{userAccess.accessLevel}</p>
        </div>
      ))}
    </div>
  );
}
