import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import notesReducer from "./reducers/notes";
import selectedNote from "./reducers/selected-note";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
    selectedNote: selectedNote,
  },
});

export default store;
