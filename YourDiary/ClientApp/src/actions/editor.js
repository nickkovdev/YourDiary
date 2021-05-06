import {
  DIARY_ENTRY_PUBLISH_OK,
  DIARY_ENTRY_PUBLISH_FAIL,
  EDITOR_CONTENT_CHANGE,
  EDITOR_TITLE_CHANGE
} from "./types";

import EditorService from "../services/editor.service";

export const publish = (title, content, tags) => (dispatch) => {
  return EditorService.publish(title, content, tags).then(
    (response) => {
      dispatch({
        type: DIARY_ENTRY_PUBLISH_OK,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: DIARY_ENTRY_PUBLISH_FAIL,
        payload: error,
      });

      return Promise.reject();
    }
  );
};

export const setEntryContent = (content) => (dispatch) => {
  return dispatch({
    type: EDITOR_CONTENT_CHANGE,
    payload: content,
  });
};

export const setEntryTitle = (title) => (dispatch) => {
  return dispatch({
    type: EDITOR_TITLE_CHANGE,
    payload: title,
  });
};
