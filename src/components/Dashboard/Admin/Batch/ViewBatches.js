import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 92 },
  { headerName: "Name", field: "batch_name", filter: true, width: 300 },
  {
    headerName: "Package",
    field: "add_package.package_name",
    filter: true,
    width: 220,
  },
  {
    headerName: "Start Date",
    field: "batch_startdate",
    filter: true,
    width: 210,
  },
  { headerName: "End Date", field: "batch_enddate", filter: true, width: 210 },
  {
    headerName: "Start Time",
    field: "batch_start_timing",
    filter: true,
    width: 210,
  },
  {
    headerName: "End Time",
    field: "batch_end_timing",
    filter: true,
    width: 210,
  },
];

const ViewBatches = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [batchList, setBatchList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    const fetchBatches = async () => {
      if (activeTab !== "View Batch") return;
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/batchview/`,
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
          const batchesWithNumbers = response.data.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setBatchList(batchesWithNumbers);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, [activeTab, authData?.accessToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (batchList.length === 0) {
    return <h5 className="text-center text-danger">No Batches Available !!</h5>;
  }

  return <Table rowData={batchList} columnDefs={columns} />;
};

export default ViewBatches;
