"use client";

import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "notekraft/lib/utils";
import { Note } from "notekraft/types/note";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export function NotesList({ notes }: { notes: Note[] }) {
  const [selectedNote, setNote] = useState<Note>();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {notes.map((note) => (
          <button
            key={note.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selectedNote?.id === note.id && "bg-muted"
            )}
            onClick={() => {}}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{note.title}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedNote?.id === note.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(note.updatedAt, {
                    addSuffix: true,
                  })}
                </div>
              </div>
              {/* <div className="text-xs font-medium">
               
              </div> */}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {note.content?.slice(0, 10)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
