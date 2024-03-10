"use server";

import { Note } from "notekraft/types/note";
import { serverSession } from "notekraft/utils/nextAuth-utils";

/**
 * Get notes from backend for current user
 *
 * @param userId User Id of current user
 * @param jwtToken Auth JWT token
 * @returns List of Notes
 */
export async function getNotes(): Promise<Note[]> {
  try {
    const session = await serverSession();

    const url = `${process.env.BACKEND_URL}/notes/getNotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.jwtToken}`,
      },
      body: JSON.stringify({
        user: {
          _id: session?.user.id,
        },
      }),
    });

    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as Note[];

    return data.reverse();
  } catch (error) {
    console.error("Failed to get notes");
    throw error;
  }
}

/**
 * Save note
 *
 * @param userId User Id of current user
 * @param jwtToken Auth JWT token
 * @returns List of Notes
 */
export async function saveNote(
  title?: string,
  content?: string,
  noteId?: string
): Promise<Note> {
  try {
    const session = await serverSession();

    const url = `${process.env.BACKEND_URL}/notes/saveNote`;
    const saveNotePayload = {
      ...(noteId ? { _id: noteId } : {}),
      title: title,
      content: content,
      user: {
        _id: session?.user.id,
      },
    };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.jwtToken}`,
      },
      body: JSON.stringify(saveNotePayload),
    });

    if (!response.ok) {
      Promise.reject("Failed to save");
    }

    const data = (await response.json()) as Note;
    return data;
  } catch (error) {
    console.error("Failed to save notes");
    throw error;
  }
}

/**
 * Save note
 *
 * @param userId User Id of current user
 * @param jwtToken Auth JWT token
 * @returns List of Notes
 */
export async function deleteNote(noteId: string): Promise<void> {
  try {
    const session = await serverSession();

    const url = `${process.env.BACKEND_URL}/notes/deleteNote`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.jwtToken}`,
      },
      body: JSON.stringify({
        _id: noteId,
      }),
    });

    if (!response.ok) {
      return Promise.reject("Failed to delete note");
    }
  } catch (error) {
    console.error("Delete failed");
    throw error;
  }
}
