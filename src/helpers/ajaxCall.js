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
    const response = await fetch(
      `https://studystreak.in/api${url}`,
      fetchObj
    );
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

export default ajaxCall;
