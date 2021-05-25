import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEntryContent,
  setEntryTitle,
  setEntryId,
} from "../../actions/editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { publish, save, updateEntry } from "../../actions/editor";
import { uuidv4 } from "../../helpers/getguid";
import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import { getEntry } from "../../actions/entry";

const EditEntry = () => {
  let { id } = useParams();
  const [editorValue, setEditorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [tagsValue, setTagsValue] = useState([""]);

  const dispatch = useDispatch();
  
  
  const { diaryEntry } = useSelector((state) => state.diaryEntries);

  useEffect(() => {
      
  }, []);

  useEffect(() => {
    if(diaryEntry) {
        setEditorValue(diaryEntry.content)
        setTitleValue(diaryEntry.title)
    }
  }, [diaryEntry]);

  useEffect(() => {
    dispatch(getEntry(id));
  }, []);

  useEffect(() => {
    dispatch(setEntryContent(editorValue));
  }, [editorValue]);

  useEffect(() => {
    dispatch(setEntryTitle(titleValue));
  }, [titleValue]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitleValue(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEntry(titleValue, editorValue, tagsValue, id));
  };

  if(diaryEntry) {
    return (
        <div>
          <div className="form-group row">
            <h3 htmlFor="colFormLabelLg" className="editorTitle">Edit Entry in Diary</h3>
            <div className="col-sm-12">
              <input
                className="form-control form-control-lg"
                id="colFormLabelLg"
                value={titleValue}
                onChange={onChangeTitle}
                placeholder="Title"
              />
            </div>
          </div>
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={setEditorValue}
            modules={modules}
          />
          <div
            className="btn-toolbar justify-content-end"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="btn-group" role="group" aria-label="First group">
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#tagModal"
              >
                Add Tags
              </button>
            </div>
          </div>
          <div
            className="btn-toolbar justify-content-end"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="btn-group" role="group" aria-label="First group">
              <button
                type="button"
                className="btn btn-primary"
                onSubmit={handleSubmit}
                onClick={handleSubmit}
              >
                Save Diary Entry
              </button>
            </div>
          </div>
        </div>
      );
  } else{
      return(
    <div>
      <p>Loading...</p>
    </div>
    )
  }
  
};

export default EditEntry;
