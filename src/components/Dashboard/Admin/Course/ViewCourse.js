import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 60 },
  { headerName: "Course Title", field: "Course_Title", filter: true },
  { headerName: "Course Identifire", field: "course_identifier", filter: true },
  {
    headerName: "Course Delivery",
    field: "course_delivery",
    filter: true,
    width: 160,
  },
  { headerName: "Course Type", field: "course_type", filter: true, width: 130 },
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
  {
    headerName: "Max Enrollment",
    field: "max_enrollments",
    filter: true,
    width: 170,
  },
  { headerName: "Category", field: "Category.name", filter: true, width: 110 },
  { headerName: "Level", field: "Level.name", filter: true, width: 110 },
  { headerName: "Language", field: "Language.name", filter: true, width: 120 },
  {
    headerName: "SEO Meta Keyword",
    field: "SEO_Meta_Keywords",
    filter: true,
    width: 180,
  },
  {
    headerName: "SEO Meta Keyword",
    field: "Meta_Description",
    filter: true,
    width: 180,
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

  return <Table rowData={courseList} columnDefs={columns} />;
};

export default ViewCourse;
