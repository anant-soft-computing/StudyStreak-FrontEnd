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
  if (
    Math.round(timeDiff / 1000 / 60) >= 30 &&
    Math.round(timeDiff / 1000 / 60 / 60) > 24
  ) {
    deleteFromLocalStorage("loginInfo");
    return -1;
  } else if (
    Math.round(timeDiff / 1000 / 60) >= 30 &&
    Math.floor(timeDiff / 1000 / 60 / 60) < 24
  ) {
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
    return response;
  } else if (Math.round(timeDiff / 1000 / 60) < 30) {
    return true;
  }
}

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
  getRefreshToken,
  authenticateUser,
};
