import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "notekraft/types/note";

const initialState: { selectedNote: Note } = {
  selectedNote: { title: "", content: "" },
};

const selectedNoteSlice = createSlice({
  name: "selectedNote",
  initialState,
  reducers: {
    setSelectedNote: (state, action: PayloadAction<Note>) => {
      state.selectedNote = action.payload;
    },
    setSelectedNoteContent: (state, action: PayloadAction<string>) => {
      state.selectedNote.content = action.payload;
    },
    setSelectedNoteTitle: (state, action: PayloadAction<string>) => {
      state.selectedNote.title = action.payload;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = { title: "", content: "" };
    },
  },
});

export const {
  setSelectedNote,
  setSelectedNoteContent,
  setSelectedNoteTitle,
  clearSelectedNote,
} = selectedNoteSlice.actions;
export default selectedNoteSlice.reducer;
