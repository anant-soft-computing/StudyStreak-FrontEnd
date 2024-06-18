import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 86,
  },
  { headerName: "First Name", field: "first_name", filter: true },
  { headerName: "Last Name", field: "last_name", filter: true },
  {
    headerName: "Batch Name",
    field: "select batch",
    filter: true,
    valueGetter: (params) => {
      return params.data.select_batch.map((item) => item).join(", ");
    },
    width: 630,
  },
];

const LeaderBoard = ({ batchId, activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    if (activeTab === "Leader Board") {
      setIsLoading(true);
      (async () => {
        try {
          const studentData = [];
          for (let i = 0; i < batchId.length; i++) {
            let totalCount = 0;
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
            if (response.data.message === "No Students are available") {
              continue;
            }
            const students = response.data.students.map((student) => ({
              ...student,
              no: ++totalCount,
            }));
            studentData.push(...students);
          }
          setIsLoading(false);
          setStudentList(studentData);
        } catch (error) {
          console.log("error", error);
        }
      })();
    }
  }, [activeTab, batchId]);

  return (
    <div>
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          {isLoading ? (
            <Loading text="Loading..." color="primary" />
          ) : studentList.length > 0 ? (
            <Table rowData={studentList} columnDefs={columns} />
          ) : (
            <h5 className="text-center text-danger">No Students Found !!</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
