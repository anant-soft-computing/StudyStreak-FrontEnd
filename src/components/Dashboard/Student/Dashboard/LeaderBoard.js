import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const LeaderBoard = () => {
  const [studentList, setStudentList] = useState([]);
  const [batchId, setBatchId] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/batchview/`,
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
          setBatchId(response?.data?.map((item) => item.id));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let totalCount = 0;
        const studentData = [];
        for (let i = 0; i < batchId.length; i++) {
          const id = batchId[i];
          const response = await ajaxCall(
            `/batchidwisestudentgetview/${id}/`,
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
          const students = response.data.students.map((student) => ({
            ...student,
            no: ++totalCount,
          }));
          studentData.push(...students);
        }
        setStudentList(studentData);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [batchId]);
  
  return (
    <div>
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Batch Name</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map(
                ({ no, first_name, last_name, select_batch }, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "" : "dashboard__table__row"
                    }`}
                  >
                    <th>
                      <div>{no}.</div>
                    </th>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{select_batch.map((item) => item).join(", ")}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
