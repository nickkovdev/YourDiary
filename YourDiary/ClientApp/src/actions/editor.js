import {
  DIARY_ENTRY_PUBLISH_OK,
  DIARY_ENTRY_PUBLISH_FAIL,
  EDITOR_CONTENT_CHANGE,
  EDITOR_TITLE_CHANGE,
  EDITOR_SET_GUID_ID,
  DIARY_ENTRY_SAVE_OK,
  DIARY_ENTRY_SAVE_FAIL,
} from "./types";

import EditorService from "../services/editor.service";

let lastId;

export const publish = (title, content, tags, diaryId) => (dispatch) => {
  return EditorService.publish(title, content, tags, diaryId).then(
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

export const save = (title, content, tags, diaryId) => (dispatch) => {
  return EditorService.save(title, content, tags, diaryId).then(
    (response) => {
      dispatch({
        type: DIARY_ENTRY_SAVE_OK,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: DIARY_ENTRY_SAVE_FAIL,
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

export const setEntryId = (id) => (dispatch) => {
    return dispatch({
      type: EDITOR_SET_GUID_ID,
      payload: id,
    });
};
