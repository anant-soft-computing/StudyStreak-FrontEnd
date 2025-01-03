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
    width: 80,
  },
  { headerName: "Name", field: "package_name", filter: true },
  { headerName: "Price", field: "package_price", filter: true },
  {
    headerName: "Type",
    field: "PackageType.name",
    filter: true,
  },
  {
    headerName: "Course",
    field: "select_course.Course_Title",
    filter: true,
  },
  { headerName: "Duration", field: "duration" },
  {
    headerName: "Total Full Length Test",
    field: "full_length_test_count",
    filter: true,
  },
  {
    headerName: "Total Practice Test",
    field: "practice_test_count",
    filter: true,
  },
  {
    headerName: "Speaking Test",
    field: "speaking_test_count",
    filter: true,
  },
  {
    headerName: "Total Writing Evaluation",
    field: "writing_evaluation_count",
    filter: true,
  },
  {
    headerName: "Total Group Doubt Solving",
    field: "group_doubt_solving_count",
    filter: true,
  },
  {
    headerName: "Total One To One Doubt Solving",
    field: "one_to_one_doubt_solving_count",
    filter: true,
  },
  {
    headerName: "Total Tutor Support Classes",
    field: "tutor_support_count",
    filter: true,
  },
  {
    headerName: "Total Webianr Classes",
    field: "webinar_count",
    filter: true,
  },
  {
    headerName: "Total Counselling Classes",
    field: "counselling_count",
    filter: true,
  },
];

const ViewPackages = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [packageList, setPackageList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View Package") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/packagelistview/",
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
          if (response?.status === 200) {
            const packageWithNumbers = response?.data?.map(
              (packageItem, index) => ({
                ...packageItem,
                no: index + 1,
              })
            );
            setPackageList(packageWithNumbers);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [authData?.accessToken, activeTab]);

  return isLoading ? (
    <Loading />
  ) : packageList.length > 0 ? (
    <Table rowData={packageList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Packages Available !!</h5>
  );
};

export default ViewPackages;
