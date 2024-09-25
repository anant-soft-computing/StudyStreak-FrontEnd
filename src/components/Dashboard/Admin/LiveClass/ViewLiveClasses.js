import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 110 },
  {
    headerName: "Batch",
    field: "select_batch",
    filter: true,
    width: 280,
    cellRenderer: ({ data }) => (
      <div>
        {data.select_batch?.map((item) => item.batch_name).join(", ") || "-"}
      </div>
    ),
  },
  {
    headerName: "Course",
    field: "select_course",
    filter: true,
    width: 280,
    cellRenderer: ({ data }) => (
      <div>
        {data.select_course?.map((item) => item.Course_Title).join(", ") || "-"}
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
    const fetchLiveClasses = async () => {
      if (activeTab !== "View LiveClass") return;
      setIsLoading(true);
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
          const liveClassWithNumbers = response.data.map(
            (liveClass, index) => ({
              ...liveClass,
              no: index + 1,
            })
          );
          setLiveClassList(liveClassWithNumbers);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveClasses();
  }, [activeTab, authData?.accessToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (liveClassList.length === 0) {
    return (
      <h5 className="text-center text-danger">No Live Classes Available !!</h5>
    );
  }

  return <Table columnDefs={columns} rowData={liveClassList} />;
};

export default ViewLiveClasses;
