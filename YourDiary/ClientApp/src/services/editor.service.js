import axios from "axios";
import authHeader  from "../services/auth-header";

const API_URL = "http://localhost:60795/api/diaryentry/";

const config = {
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${authHeader()}`
  },
};

const publish = (title, content, tags) => {
  return axios
    .post(
      API_URL,
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
};
