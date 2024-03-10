import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import notesReducer from "./counter";
import selectedNote from "./selected-note";

const rootReducer = combineReducers({
  counter: counterReducer,
  notes: notesReducer,
  selectedNote: selectedNote,
});

export default rootReducer;
