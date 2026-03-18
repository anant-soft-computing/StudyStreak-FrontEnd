import { jwtDecode } from "jwt-decode";
import { getAndSetRefreshToken } from "./helperFunction";

const ajaxCall = async (
  url,
  fetchObj = {},
  timeOut,
  timeOutFunction = () => {}
) => {
  try {
    const id = setTimeout(() => {
      timeOutFunction();
    }, timeOut);

    const token = fetchObj?.headers?.Authorization;

    if (token) {
      const decodedToken = jwtDecode(token);
      const tokenExpirationTime = decodedToken.exp * 1000;

      const updatedToken = await checkTokenExpiration(
        token,
        tokenExpirationTime
      );
      if (updatedToken) {
        fetchObj.headers.Authorization = updatedToken;
      }
    }

    const response = await fetch(`https://studystreak.in/api${url}`, fetchObj);
    clearTimeout(id);
    const data = await response.json();

    return {
      status: response.status,
      isError: !response.ok,
      isNetwork: false,
      data,
    };
  } catch (e) {
    return {
      status: null,
      isError: true,
      isNetwork: true,
      data: null,
      error: e,
    };
  }
};

const checkTokenExpiration = async (token, tokenExpirationTime) => {
  const currentTime = new Date().getTime();
  const thirtySeconds = 30000;

  if (tokenExpirationTime - currentTime < thirtySeconds) {
    const newToken = await getAndSetRefreshToken();
    return `Bearer ${newToken}`;
  } else {
    return token;
  }
};

export default ajaxCall;
