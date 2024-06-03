import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const PointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
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
          setPointHistory(response?.data);
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
      <h4>My Points:{pointHistory?.total_points}</h4>
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Exam</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {pointHistory?.history?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "" : "dashboard__table__row"
                  }`}
                >
                  <th>
                    <div>{index + 1}.</div>
                  </th>
                  <td>{item.model}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
