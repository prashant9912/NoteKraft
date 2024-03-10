import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "notekraft/types/note";

const initialState: { notes: Note[] } = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
