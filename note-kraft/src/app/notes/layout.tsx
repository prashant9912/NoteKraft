import { redirect } from "next/navigation";
import { Sidebar } from "notekraft/components/sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "notekraft/components/ui/resizable";

import { serverSession } from "notekraft/utils/nextAuth-utils";
import { ReactNode } from "react";

export default async function Notes({ children }: { children: ReactNode }) {
  const session = await serverSession();
  if (session) {
    return <NotesLayout>{children}</NotesLayout>;
  } else {
    redirect("/login");
  }
}

/**
 * Notes pages layout
 */
export function NotesLayout({ children }: { children: ReactNode }) {
  const defaultLayout = [340, 655];
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="items-stretch">
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
