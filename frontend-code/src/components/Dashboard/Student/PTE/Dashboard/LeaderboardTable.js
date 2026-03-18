
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Trophy } from "lucide-react";
import ajaxCall from "../../../../../helpers/ajaxCall";

const LeaderboardTable = () => {
  const studentID = JSON.parse(localStorage.getItem("StudentID"));
  const courseID = JSON.parse(localStorage.getItem("course"))?.course_id;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/gamification/points/summary/?course_id=${courseID}`,
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
          setTableData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseID]);

  return (
    <div
      className="leaderboard-section mb-4 p-3 rounded"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
      }}
    >
      <h5 className="mb-3 d-flex align-items-center">
        <Trophy size={24} className="me-2" /> Top Student -{" "}
        {moment().format("LLLL")}
      </h5>
      <div
        className="dashboard__table table-responsive"
        style={{ maxHeight: "264px" }}
      >
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Practice</th>
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
                  <td className={textClass}>{total_points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;