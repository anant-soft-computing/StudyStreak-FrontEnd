import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 60 },
  { headerName: "Course Title", field: "Course_Title", filter: true },
  { headerName: "Course Identifire", field: "course_identifier", filter: true },
  {
    headerName: "Course Delivery",
    field: "course_delivery",
    filter: true,
  },
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
  {
    headerName: "Max Enrollment",
    field: "max_enrollments",
    filter: true,
  },
  { headerName: "Category", field: "Category.name", filter: true },
  { headerName: "Level", field: "Level.name", filter: true },
  { headerName: "Language", field: "Language.name", filter: true },
  {
    headerName: "SEO Meta Keyword",
    field: "SEO_Meta_Keywords",
    filter: true,
  },
  {
    headerName: "SEO Meta Keyword",
    field: "Meta_Description",
    filter: true,
  },
];

const ViewCourse = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCouresList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View Course") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/courselistview/`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.accessToken}`,
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
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeTab, authData?.accessToken]);

  return isLoading ? (
    <Loading />
  ) : courseList.length > 0 ? (
    <Table rowData={courseList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Course Available !!</h5>
  );
};

export default ViewCourse;
