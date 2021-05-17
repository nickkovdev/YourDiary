import {
    DRAFTS_LOADED_SUCCESS,
    DRAFTS_LOADED_FAIL,
    DRAFTS_SET,
    PUBLISHED_LOADED_SUCCESS,
    PUBLISHED_LOADED_FAIL,
    PUBLISHED_SET,
    GET_DIARY_ENTRY,
    GET_DIARY_ENTRY_FAIL
  } from "./types";
  
  import EntryService from "../services/entry.service";

  let lastId;
  
  export const drafts = () => (dispatch) => {
    return EntryService.drafts().then(
      (response) => {
        dispatch({
          type: DRAFTS_LOADED_SUCCESS,
          payload: response,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: DRAFTS_LOADED_FAIL,
          payload: error,
        });
        return Promise.reject();
      }
    );
  };
  
  export const setEntriesDrafts = (content) => (dispatch) => {
    return dispatch({
      type: DRAFTS_SET,
      payload: content,
    });
  };

  export const published = (userId) => (dispatch) => {
    return EntryService.published(userId).then(
      (response) => {
        dispatch({
          type: PUBLISHED_LOADED_SUCCESS,
          payload: response,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: PUBLISHED_LOADED_FAIL,
          payload: error,
        });
        return Promise.reject();
      }
    );
  };

  export const getEntry = (entryId) => (dispatch) => {
    if(lastId != entryId) {
      return EntryService.getEntry(entryId).then(
        (response) => {
          dispatch({
            type: GET_DIARY_ENTRY,
            payload: response,
          });
          lastId = entryId;
          return Promise.resolve();
        },
        (error) => {
          dispatch({
            type: GET_DIARY_ENTRY_FAIL,
            payload: error,
          });
          return Promise.reject();
        }
      );
    }
  };
  
  export const setEntriesPublished = (content) => (dispatch) => {
    return dispatch({
      type: PUBLISHED_SET,
      payload: content,
    });
  };
  