import axios from "axios";
import { logout } from "../actions/auth";

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
    logout()
    window.location.href = '/login'
  }

  return Promise.reject(error);
}

const publish = (title, content, tags, diaryId) => {
  return instance
    .post(
      API_URL + diaryId + '/publish',
      {
        title,
        content,
        tags,
      }
    )
    .then((response) => {
      return response.data;
    });
};

const updateEntry = (title, content, tags, diaryId) => {
  return instance
    .patch(
      API_URL + diaryId,
      {
        title,
        content,
        tags,
      }
    )
    .then((response) => {
      return response.data;
    });
};

const save = (title, content, tags, diaryId) => {
  return instance
    .post(
      API_URL + diaryId + '/draft',
      {
        title,
        content,
        tags,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export default {
  publish,
  save,
  updateEntry
};
