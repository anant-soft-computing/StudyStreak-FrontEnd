import React, { useEffect, useState } from "react";
import RegularClassList from "./RegularClassList";
import ajaxCall from "../../../../helpers/ajaxCall";
import { filterByDateRange } from "../Classes/filterByDateRange";

const RegularClass = ({ selectedDate, onDataFetch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [regularClass, setRegularClass] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=Regular Class",
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
        if (response.status === 200) {
          onDataFetch(response?.data);
          setRegularClass(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const regularClasses = () => {
    return regularClass.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  return (
    <RegularClassList isLoading={isLoading} regularClass={regularClasses()} />
  );
};

export default RegularClass;
