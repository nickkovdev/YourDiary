import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const API_URL = "http://localhost:60795/api/diaryentry/";

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user) {
    return user.token
  } else {
    return null
  }
}

const instance = axios.create({
  timeout: 1000,
});

instance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "bearer " + getToken();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
);

const responseSuccessHandler = response => {
  return response;
};

const responseErrorHandler = error => {
  if (error.response.status === 401) {
    window.location.href = '/login'
  }

  return Promise.reject(error);
}

const drafts = () => {
  return instance
    .get(
      API_URL + 'drafts'
    )
    .then((response) => {
      return response.data;
    });
};

const published = (userId) => {
  return instance
    .get(
      API_URL + 'user/' + userId
    )
    .then((response) => {
      return response.data;
    });
};

const getEntry = (entryId) => {
  return instance
    .get(
      API_URL + entryId
    )
    .then((response) => {
      return response.data;
    });
};

const deleteEntry = (entryId) => {
  return instance
    .delete(
      API_URL + entryId
    )
    .then((response) => {
      return response.data;
    });
};

export default {
    drafts,
    published,
    getEntry,
    deleteEntry
};
