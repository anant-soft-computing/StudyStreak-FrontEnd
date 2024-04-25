import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 76,
    headerClass: "ag-grid-header",
  },
  { headerName: "Name", field: "batch_name", filter: true },
  { headerName: "Package", field: "add_package.package_name", filter: true },
  {
    headerName: "Start Date",
    field: "batch_startdate",
    filter: true,
    width: 160,
  },
  { headerName: "End Date", field: "batch_enddate", filter: true, width: 160 },
  {
    headerName: "Start Time",
    field: "batch_start_timing",
    filter: true,
    width: 160,
  },
  {
    headerName: "End Time",
    field: "batch_end_timing",
    filter: true,
    width: 160,
  },
];

const ViewBatches = () => {
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/batchview/`,
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

        if (response?.status === 200) {
          const batchesWithNumbers = response?.data?.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setBatchList(batchesWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return <Table rowData={batchList} columnDefs={columns} />;
};

export default ViewBatches;
