import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import ajaxCall from "../../helpers/ajaxCall";
import "react-select-search/style.css";

const SelectionBox = (props) => {
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

    const allObj = response.data?.map((option) => {
      let name = "";
      props.objKey.forEach((key, index) => {
        if (index !== 0) name += " - ";
        name += option[key];
      });
      return { id: option.id, name };
    });
    if (props.isEdit) {
      if (props.multiple) {
        const selectedObj = allObj.filter((obj) => {
          for (let i = 0; i < props.idVals.length; i++) {
            if (props.idVals[i] === obj.id) return true;
          }
          return false;
        });
        props.onEditchange(selectedObj);
      } else {
        const selectedObj = allObj.filter((obj) => props.idVals === obj.id);
        props.onEditchange(selectedObj);
      }
    }
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
      props.isEdit
        ? props.isEditLoading
          ? data()
          : console.log("no need")
        : data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  return (
    <Multiselect
      options={options}
      selectedValues={props.value}
      onSelect={props.onSelect}
      onRemove={props.onSelect}
      name={props.name}
      search={props.isSearch}
      placeholder="Select Options"
      singleSelect={!props.multiple}
      displayValue="name"
      loading={isLoading}
      loadingMessage={props.loadMsg}
    />
  );
};

export default SelectionBox;
