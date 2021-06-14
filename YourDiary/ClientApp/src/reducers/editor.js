import {
  EDITOR_CONTENT_CHANGE,
  EDITOR_TITLE_CHANGE,
  EDITOR_SET_GUID_ID,
  DIARY_ENTRY_SAVE_OK,
  DIARY_ENTRY_SAVE_FAIL,
  DIARY_ENTRY_UPDATE_OK,
  DIARY_ENTRY_UPDATE_FAIl,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DIARY_ENTRY_SAVE_OK:
      return { ...state, diaryStatus: payload };

    case DIARY_ENTRY_SAVE_FAIL:
      return { ...state, message: "" };

    case EDITOR_CONTENT_CHANGE:
      return { ...state, diaryContent: payload };

    case EDITOR_TITLE_CHANGE:
      return { ...state, diaryTitle: payload };

    case EDITOR_SET_GUID_ID:
      return { ...state, diaryId: payload };

    case DIARY_ENTRY_UPDATE_OK:
      return { ...state, message: "" };

    case DIARY_ENTRY_UPDATE_FAIl:
      return { ...state, message: "" };
    default:
      return state;
  }
}
