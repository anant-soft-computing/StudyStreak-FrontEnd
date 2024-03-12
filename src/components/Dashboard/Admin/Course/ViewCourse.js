import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Course Title", field: "Course_Title", filter: true },
  { headerName: "Course Identifire", field: "course_identifier", filter: true },
  { headerName: "Course Delivery", field: "course_delivery", filter: true },
  { headerName: "Course Type", field: "course_type", filter: true },
  {
    headerName: "Enrollment Start Date",
    field: "EnrollmentStartDate",
    filter: true,
  },
  {
    headerName: "Enrollment End Date",
    field: "EnrollmentEndDate",
    filter: true,
  },
  { headerName: "Max Enrollment", field: "max_enrollments", filter: true },
  { headerName: "Category", field: "Category.name", filter: true },
  { headerName: "Level", field: "Level.name", filter: true },
  { headerName: "Language", field: "Language.name", filter: true },
  { headerName: "SEO Meta Keyword", field: "SEO_Meta_Keywords", filter: true },
  { headerName: "SEO Meta Keyword", field: "Meta_Description", filter: true },
  { headerName: "Language", field: "Language.name", filter: true },
  {
    headerName: "Primary Instructor",
    field: "primary_instructor.first_name",
    filter: true,
  },
];

const ViewCourse = () => {
  const [courseList, setCouresList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/courselistview/`,
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
          const courseWithNumbers = response?.data?.map((course, index) => ({
            ...course,
            no: index + 1,
          }));
          setCouresList(courseWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: courseList,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default ViewCourse;
