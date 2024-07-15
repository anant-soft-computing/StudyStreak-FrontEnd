import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import TuotorSupportList from "./TuotorSupportList";

const TutorSupport = ({ selectedDateRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorSupportClass, setTutorSupportClass] = useState([]);
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const tutorSupportClassData = [];
        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
          const response = await ajaxCall(
            `/liveclass_listwithid_view/${batchId}/`,
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
            const data = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Tutor Support"
            );
            tutorSupportClassData.push(...data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
        setTutorSupportClass(tutorSupportClassData);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const tutorData = () => {
    return tutorSupportClass.filter((item) => {
      const classDate = moment(item.start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange?.[0];
      if (startDate && !endDate) {
        return classDate === moment(startDate).format("YYYY-MM-DD");
      }
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  return (
    <div className="row">
      <TuotorSupportList
        isLoading={isLoading}
        tutorSupportClass={tutorData()}
      />
    </div>
  );
};

export default TutorSupport;
