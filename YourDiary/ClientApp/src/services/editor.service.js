import axios from "axios";
import authHeader  from "../services/auth-header";

const API_URL = "http://localhost:60795/api/diaryentry/";

const config = {
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${authHeader()}`
  },
};

const publish = (title, content, tags, diaryId) => {
  return axios
    .post(
      API_URL + diaryId + '/publish',
      {
        title,
        content,
        tags,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const save = (title, content, tags, diaryId) => {
  return axios
    .post(
      API_URL + diaryId + '/draft',
      {
        title,
        content,
        tags,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

export default {
  publish,
  save
};
