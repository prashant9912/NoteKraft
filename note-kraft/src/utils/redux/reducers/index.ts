import { combineReducers } from "@reduxjs/toolkit";
import notesReducer from "./notes";
import selectedNote from "./selected-note";

const rootReducer = combineReducers({
  notes: notesReducer,
  selectedNote: selectedNote,
});

export default rootReducer;
