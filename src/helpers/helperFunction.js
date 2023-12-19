import ajaxCall from "./ajaxCall";

Storage.prototype.setObject = (key, value) => {
  this.setItem(key, JSON.stringify(value));
};

const setToLocalStorage = (key, value, isObj) => {
  let data = value;
  if (isObj) {
    data = JSON.stringify(value);
  }
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

const deleteFromLocalStroage = (key) => {
  localStorage.removeItem(key);
};

const getRefreshToken = async (refreshToken) => {
  const response = await ajaxCall(
    "token/refresh/",
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    "POST",
    JSON.stringify({
      refreshToken: refreshToken,
    })
  );
  if (response.msg === "Login Successful") {
    const localObj = {
      accessToken: response.token.access,
      refreshToken: response.token.refresh,
      user_type: response.token.user_status,
      userId: response.token.userid,
    };
    setToLocalStorage("LoginInfo", localObj, true);
  }
};

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStroage,
  getRefreshToken,
};
