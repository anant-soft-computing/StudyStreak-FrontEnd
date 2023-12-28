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

export {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
};
