import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 76,
  },
  { headerName: "Name", field: "batch_name", filter: true },
  { headerName: "Package", field: "add_package.package_name", filter: true },
  {
    headerName: "Start Date",
    field: "batch_startdate",
    filter: true,
  },
  { headerName: "End Date", field: "batch_enddate", filter: true },
  {
    headerName: "Start Time",
    field: "batch_start_timing",
    filter: true,
  },
  {
    headerName: "End Time",
    field: "batch_end_timing",
    filter: true,
  },
];

const ViewBatches = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [batchList, setBatchList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
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
          const batchesWithNumbers = response?.data?.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setIsLoading(false);
          setBatchList(batchesWithNumbers);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [authData?.accessToken]);

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : batchList.length > 0 ? (
    <Table rowData={batchList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Batches Available !!</h5>
  );
};

export default ViewBatches;
