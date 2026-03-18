import store from "../store";
import { authAction } from "../store/authStore";
import ajaxCall from "./ajaxCall";

Storage.prototype.setObject = (key, value) => {
  this.setItem(key, JSON.stringify(value));
};

const setToLocalStorage = (key, value, isObj) => {
  let data = value;
  if (isObj) data = JSON.stringify(value);
  localStorage.setItem(key, data);
  return true;
};

const getFromLocalStorage = (key, isObj) => {
  if (localStorage.getItem(key)) {
    if (isObj) return JSON.parse(localStorage.getItem(key));
    return localStorage.getItem(key);
  }
  return -1;
};

const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const getRefreshToken = async (refreshToken) => {
  const response = await ajaxCall(
    "/token/refresh/",
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    "POST",
    JSON.stringify({
      refresh: refreshToken,
    })
  );
  if (response.msg === "login Successful") {
    const localObj = {
      accessToken: response.token.access,
      refreshToken: response.token.refresh,
      user_type: response.token.user_status,
      userId: response.token.userid,
      timeOfLogin: Date.now(),
    };
    setToLocalStorage("loginInfo", localObj, true);
  }
};

async function authenticateUser(timeInMs, refreshToken) {
  const timeDiff = Date.now() - timeInMs;
  if (Math.round(timeDiff / 1000) >= 60) {
    // Experied after 1 minute
    deleteFromLocalStorage("loginInfo");
    return -1;
  } else if (Math.round(timeDiff / 1000) >= 30) {
    // Experied after 1 minute
    const response = await ajaxCall(
      "/token/refresh/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
      },
      8000
    );

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    return response;
  } else {
    return true;
  }
}

const getAndSetRefreshToken = async () => {
  const { refreshToken, timeOfLogin, userId, user_role, user_type, username } =
    getFromLocalStorage("loginInfo", true) || {};

  if (refreshToken) {
    try {
      const response = await fetch(
        "https://studystreak.in/api/token/refresh/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (response.status === 401) {
        store.dispatch(
          authAction.setAuthStatus({
            username: "",
            authLoading: false,
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            userId: null,
            user_type: null,
            user_role: null,
            timeOfLogin: null,
            logInOperation: 0,
          })
        );
        localStorage.clear();
        window.location.href = "/login";
        return;
      }

      const data = await response.json();

      if (response?.status === 200 && data?.access) {
        const localObj = {
          //update access token and set existing data as it is
          user_type,
          userId,
          user_role,
          timeOfLogin,
          username,
          refreshToken,
          accessToken: data.access,
        };
        setToLocalStorage("loginInfo", localObj, true); //set data to local storage
        //update data to the store
        store.dispatch(
          authAction.setRefreshTokenAuthStatus({
            accessToken: data?.access,
          })
        );
        return data?.access;
      }
    } catch (error) {
      store.dispatch(
        authAction.setAuthStatus({
          username: "",
          authLoading: false,
          loggedIn: false,
          accessToken: null,
          refreshToken: null,
          userId: null,
          user_type: null,
          user_role: null,
          timeOfLogin: null,
          logInOperation: 0,
        })
      );
      localStorage.clear();
      window.location.href = "/login";
    }
  }
  return "";
};

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
  getRefreshToken,
  authenticateUser,
  getAndSetRefreshToken,
};
