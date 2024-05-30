import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 68 },
  { headerName: "Model", field: "model", filter: true, width: 100 },
  {
    headerName: "Exam Name",
    field: "exam_name",
    filter: true,
  },
  {
    headerName: "Exam Type",
    field: "exam_type",
    filter: true,
  },
  {
    headerName: "No. Of Questions",
    field: "no_of_questions",
    filter: true,
  },
  { headerName: "Block Type", field: "block_type", filter: true },
  {
    headerName: "Difficulty Level",
    field: "difficulty_level",
    filter: true,
  },
  {
    headerName: "Block Threshold",
    field: "block_threshold",
    filter: true,
  },
];

const ViewGamification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gamificationList, setGimificationList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/get/gamification/`,
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
          const gamificationWithNumbers = response?.data?.map(
            (gamification, index) => ({
              ...gamification,
              no: index + 1,
            })
          );
          setIsLoading(false);
          setGimificationList(gamificationWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [authData?.accessToken]);

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : gamificationList.length > 0 ? (
    <Table rowData={gamificationList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Gamification Available !!</h5>
  );
};

export default ViewGamification;
