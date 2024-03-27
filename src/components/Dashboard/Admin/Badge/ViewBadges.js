import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Name", field: "badge_name", filter: true },
];

const ViewBadges = () => {
  const [badgeList, setBadgeList] = useState([]);

  console.log("badgeList", badgeList);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/badges/`,
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
          const badgesWithNumbers = response?.data?.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setBadgeList(badgesWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: badgeList,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default ViewBadges;