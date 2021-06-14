import {
  DRAFTS_LOADED_SUCCESS,
  DRAFTS_LOADED_FAIL,
  DRAFTS_SET,
  PUBLISHED_LOADED_SUCCESS,
  PUBLISHED_LOADED_FAIL,
  PUBLISHED_SET,
  GET_DIARY_ENTRY,
  GET_DIARY_ENTRY_FAIL,
  DELETE_DIARY_ENTRY_OK,
  DELETE_DIARY_ENTRY_FAIL,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DRAFTS_LOADED_SUCCESS:
      return { ...state, diaryEntries: payload };

    case DRAFTS_LOADED_FAIL:
      return { ...state, message: "" };

    case DRAFTS_SET:
      return { ...state, diaryEntries: payload };

    case PUBLISHED_LOADED_SUCCESS:
      return { ...state, diaryEntries: payload };

    case PUBLISHED_LOADED_FAIL:
      return { ...state, message: "" };

    case PUBLISHED_SET:
      return { ...state, diaryEntries: payload };

    case GET_DIARY_ENTRY:
      return { ...state, diaryEntry: payload };

    case GET_DIARY_ENTRY_FAIL:
      return { ...state, message: "" };

    case DELETE_DIARY_ENTRY_OK:
      return { ...state, diaryEntryUpdate: payload };

    case DELETE_DIARY_ENTRY_FAIL:
      return { ...state, message: "" };

    default:
      return state;
  }
}
