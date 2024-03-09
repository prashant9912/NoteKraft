import { ThemeSwitcher } from "notekraft/components/ThemeSwitcher";
import { AvatarComponent } from "notekraft/components/avatar";
import { NotesList } from "notekraft/components/notes-list";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "notekraft/components/ui/resizable";
import { Separator } from "notekraft/components/ui/separator";
import { ReactNode } from "react";

const testNotesList = [
  {
    id: "12345",
    title: "Test Note",
    content: "wow",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Notes pages layout
 */
export default function NotesLayout({ children }: { children: ReactNode }) {
  const defaultLayout = [340, 655];
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="items-stretch">
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <div>
            <div className="flex items-center justify-between px-4 py-2">
              <h1 className="text-xl font-bold">Notes</h1>
              <div className="flex flex-row space-x-2">
                <ThemeSwitcher />
                <AvatarComponent />
              </div>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                  {/* <Input placeholder="Search" className="pl-8" /> */}
                </div>
              </form>
            </div>
            <div className="m-0 h-full">
              <NotesList notes={testNotesList} />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
