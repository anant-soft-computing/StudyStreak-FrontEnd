const ajaxCall = async (
  url,
  fetchObj = {},
) => {
  try {
    const response = await fetch(`http://65.20.73.247/api${url}`, fetchObj);
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
