import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import diaryEntry from "./editor"
import diaryEntries from "./entries"

export default combineReducers({
  auth,
  message,
  diaryEntry,
  diaryEntries
});
