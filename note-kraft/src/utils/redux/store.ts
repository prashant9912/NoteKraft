import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducers/notes";
import selectedNote from "./reducers/selected-note";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    selectedNote: selectedNote,
  },
});

export default store;
