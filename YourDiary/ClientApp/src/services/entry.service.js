import axios from "axios";
import authHeader  from "../services/auth-header";

const API_URL = "http://localhost:60795/api/diaryentry/";

const config = {
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${authHeader()}`
  },
};

const drafts = () => {
  return axios
    .get(
      API_URL + 'drafts',
      config
    )
    .then((response) => {
      return response.data;
    });
};

const published = (userId) => {
  return axios
    .get(
      API_URL + 'user/' + userId,
      config
    )
    .then((response) => {
      return response.data;
    });
};

const getEntry = (entryId) => {
  return axios
    .get(
      API_URL + entryId,
      config
    )
    .then((response) => {
      return response.data;
    });
};

export default {
    drafts,
    published,
    getEntry
};
