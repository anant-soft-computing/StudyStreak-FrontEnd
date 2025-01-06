import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 60,
    cellRenderer: (params) => params.rowIndex + 1,
  },
  {
    headerName: "Course Title",
    field: "Course_Title",
    filter: true,
    width: 370,
  },
  {
    headerName: "Course Delivery",
    field: "course_delivery",
    filter: true,
    width: 250,
  },
  { headerName: "Course Type", field: "course_type", filter: true, width: 250 },
  { headerName: "Category", field: "Category.name", filter: true, width: 250 },
  { headerName: "Language", field: "Language.name", filter: true, width: 250 },
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
            "/courselistview/",
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
            setCouresList(response?.data);
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
