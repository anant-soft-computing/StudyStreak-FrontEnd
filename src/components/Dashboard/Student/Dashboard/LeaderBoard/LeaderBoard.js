import React, { useEffect, useState } from 'react';
import ajaxCall from '../../../../../helpers/ajaxCall';

const LeaderBoard = () => {
  const [tableData, setTableData] = useState([]);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

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
          setTableData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="dashboard__inner card-background">
      <div className="dashboard__nav__title">
        <h6>Leaderboard</h6>
      </div>
      <hr />
      <div className="dashboard__table table-responsive">
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
              const { id, student_id, student_name, total_points } = item;
              const rowClass = index % 2 === 0 ? "" : "dashboard__table__row";
              const textClass = studentId === student_id ? "text-success" : "";

              return (
                <tr key={id} className={rowClass}>
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