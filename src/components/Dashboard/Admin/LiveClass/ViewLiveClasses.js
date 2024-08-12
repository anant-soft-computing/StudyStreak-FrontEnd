import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 110 },
  {
    headerName: "Batch",
    field: "select_batch",
    filter: true,
    width: 280,
    cellRenderer: (params) => (
      <div>
        {params.data.select_batch
        ?.map((item) => item.batch_name)
        .join(", ") || "-"}
      </div>
    ),
  },
  {
    headerName: "Course",
    field: "select_course",
    filter: true,
    width: 280,
    cellRenderer: (params) => (
      <div>
        {params.data.select_course
          ?.map((item) => item.Course_Title)
          .join(", ") || "-"}
      </div>
    ),
  },
  {
    headerName: "Live Class Type",
    field: "liveclasstype",
    filter: true,
    width: 280,
  },
  {
    headerName: "Meeting Name",
    field: "meeting_title",
    filter: true,
    width: 280,
  },
  {
    headerName: "Start Date",
    field: "start_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("lll"),
    width: 250,
  },
  {
    headerName: "End Date",
    field: "end_time",
    filter: true,
    valueFormatter: ({ value }) => moment(value).format("lll"),
    width: 250,
  },
];

const ViewLiveClasses = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveClassList, setLiveClassList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View LiveClass") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/liveclass_list_view/`,
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
            const liveClassWithNumbers = response?.data?.map(
              (liveClass, index) => ({
                ...liveClass,
                no: index + 1,
              })
            );
            setIsLoading(false);
            setLiveClassList(liveClassWithNumbers);
          } else {
            setIsLoading(false);
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
    <Loading text="Loading..." color="primary" />
  ) : liveClassList.length > 0 ? (
    <Table columnDefs={columns} rowData={liveClassList} />
  ) : (
    <h5 className="text-center text-danger">No Live Classes Available !!</h5>
  );
};
export default ViewLiveClasses;
