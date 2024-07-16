import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import CounsellingList from "./CounsellingList";
import moment from "moment";

const Counselling = ({ selectedDateRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [counselling, setCounselling] = useState([]);
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const counsellingData = [];
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
              (item) => item?.liveclasstype?.name === "Counselling"
            );
            counsellingData.push(...data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
        setCounselling(counsellingData);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const counsellingData = () => {
    return counselling.filter((item) => {
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
      <CounsellingList isLoading={isLoading} counselling={counsellingData()} />
    </div>
  );
};

export default Counselling;
