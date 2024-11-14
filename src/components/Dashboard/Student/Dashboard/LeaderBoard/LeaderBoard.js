import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";

const LeaderBoard = ({ studentID }) => {
  const category = localStorage.getItem("category");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/gamification/points/summary/",
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
          const data = response?.data?.filter((item) =>
            item?.courses?.category?.includes(category)
          );
          setTableData(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [category]);

  return (
    <div className="dashboard__inner card-background">
      <div className="dashboard__nav__title">
        <h6>Leaderboard</h6>
      </div>
      <hr />
      <div
        className="dashboard__table table-responsive"
        style={{ maxHeight: "264px" }}
      >
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => {
              const { student_name, total_points, student_id } = item;
              const rowClass = index % 2 === 0 ? "" : "dashboard__table__row";
              const textClass = studentID === student_id ? "text-success" : "";
              return (
                <tr key={index} className={rowClass}>
                  <td className={textClass}>{index + 1}.</td>
                  <td className={textClass}>{student_name}</td>
                  <td className={textClass}>{total_points} pts</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;