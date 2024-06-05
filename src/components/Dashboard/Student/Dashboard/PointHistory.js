import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 86,
  },
  { headerName: "Exam", field: "model", filter: true },
  { headerName: "Point", field: "points", filter: true },
];

const PointHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints,setTotalPoints] = useState(0)
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/gamification/points/`,
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
          const points = response?.data?.history.map((item, index) => ({
            ...item,
            no: index + 1,
          }));
          setIsLoading(false);
          setPointHistory(points);
          setTotalPoints(response?.data?.total_points)
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div>
      <h4>Total Points : {totalPoints}</h4>
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          {isLoading ? (
            <Loading text="...Loading" color="primary" />
          ) : pointHistory.length > 0 ? (
            <Table rowData={pointHistory} columnDefs={columns} />
          ) : (
            <h5 className="text-center text-danger">No Point Avaiable !!</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
