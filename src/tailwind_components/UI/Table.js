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
    <div className="ag-theme-quartz">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default Table;
