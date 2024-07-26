import React, { useEffect, useState } from "react";
import SelectSearch from "react-select-search";
import ajaxCall from "../../helpers/ajaxCall";

const SingleSelection = (props) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = async () => {
    let url = props.url;
    if (props?.isNeed) {
      url = props.url + `${props.separator}${props.paramName}=${props.paramId}`;
    }
    const response = await ajaxCall(
      url,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "GET",
      },
      8000
    );

    const allObj = response?.data?.map((option) => {
      let name = "";
      props.objKey?.forEach((key, index) => {
        if (index !== 0) name += " - ";
        name += option[key] ? option[key] : "NA";
      });
      if (props.needSlug) {
        return { value: option.slug, name };
      }
      return { value: option.id || option.object_id, name };
    });
    setOptions(allObj);
    setIsLoading(false);
  };

  useEffect(() => {
    if (props?.isStatic) {
      setOptions(props?.cols);
      setIsLoading(false);
      return;
    }
    if (props.url?.length) {
      data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  useEffect(() => {
    if (props?.forPopup) {
      if (props.value) {
        const getSelectedVal = options.find((option) => {
          return option.value === props.value;
        });
        props.setPopupthing(getSelectedVal ? getSelectedVal.name : "");
      }
    }
  }, [props.value, props?.forPopup, options]);

  let placeholder = isLoading
    ? "Loading"
    : options?.length
    ? "Select Options"
    : "No Data Found";

  return (
    <SelectSearch
      disabled={props?.disabled}
      options={options}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      search={props.isSearch}
      placeholder={placeholder}
    />
  );
};

export default SingleSelection;
