import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import RegularClassList from "./RegularClassList";
import { filterByDateRange } from "../Classes/filterByDateRange";


const RegularClass = ({ selectedDate, onDataFetch }) => {
  const [regularClass, setRegularClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let regularClassData = [];

        if (batchIds?.length) {
          for (let i = 0; i < batchIds.length; i++) {
            const batchId = batchIds[i];
            const response = await ajaxCall(
              `/liveclass_listwithid_view/${batchId}/?live_class_type=Regular Class`,
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
            if (response?.status === 200) {
              regularClassData = [...regularClassData, ...response?.data];
            }
          }
        }

        if (courseIds?.length) {
          for (let j = 0; j < courseIds.length; j++) {
            const courseId = courseIds[j];
            const response = await ajaxCall(
              `/liveclass-withcourseid/${courseId}/?live_class_type=Regular Class`,
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
            if (response?.status === 200) {
              regularClassData = [...regularClassData, ...response?.data];
            }
          }
        }
        onDataFetch(regularClassData);
        setRegularClass(regularClassData);
      } catch (error) {
        console.error("error", error);
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
