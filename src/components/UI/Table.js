import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Table = ({ rowData, columnDefs }) => {
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 30];
  }, []);

  const gridOptions = {
    rowData,
    columnDefs,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: paginationPageSizeSelector,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        className="ag-theme-quartz"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact {...gridOptions} />
      </div>
    </div>
  );
};

export default Table;
