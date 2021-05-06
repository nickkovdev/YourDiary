import {
  DIARY_ENTRY_PUBLISH_OK,
  DIARY_ENTRY_PUBLISH_FAIL,
  EDITOR_CONTENT_CHANGE,
  EDITOR_TITLE_CHANGE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DIARY_ENTRY_PUBLISH_OK:
      return { ...state, diaryStatus: payload };

    case DIARY_ENTRY_PUBLISH_FAIL:
      return { ...state, message: "" };

    case EDITOR_CONTENT_CHANGE:
      return { ...state, diaryContent: payload };

    case EDITOR_TITLE_CHANGE:
      return { ...state, diaryTitle: payload };
    default:
      return state;
  }
}
