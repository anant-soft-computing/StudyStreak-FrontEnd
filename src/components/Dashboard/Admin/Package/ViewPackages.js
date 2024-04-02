import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../../helpers/ajaxCall";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";

const ViewPackages = () => {
  const [packageList, setPackageList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/packagelistview/`,
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
          const packageWithNumbers = response?.data?.map(
            (packageItem, index) => ({
              ...packageItem,
              no: index + 1,
            })
          );
          setPackageList(packageWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const gridOptions = {
    rowData: packageList,
    columnDefs: [
      {
        headerName: "No.",
        field: "no",
        filter: true,
        resizable: false,
        width: 80,
      },
      { headerName: "Name", field: "package_name", filter: true, width: 120 },
      { headerName: "Price", field: "package_price", filter: true, width: 120 },
      {
        headerName: "Type",
        field: "PackageType.name",
        filter: true,
        width: 120,
      },
      {
        headerName: "Course",
        field: "select_course.Course_Title",
        filter: true,
        width: 150,
      },
      { headerName: "Duration", field: "duration", width: 120 },
      {
        headerName: "Coupon Code",
        field: "coupon_code.cupon_code",
        width: 150,
      },
      {
        headerName: "Soft Copy",
        field: "soft_copy",
        cellRenderer: renderItemAvailable,
        width: 100,
      },
      {
        headerName: "Hard Copy",
        field: "hard_copy",
        cellRenderer: renderItemAvailable,
        width: 100,
      },
      {
        headerName: "Full Length Test",
        field: "full_length_test",
        cellRenderer: renderItemAvailable,
        width: 150,
      },
      {
        headerName: "Practice Test",
        field: "practice_test",
        cellRenderer: renderItemAvailable,
        width: 120,
      },
      {
        headerName: "Speaking Test",
        field: "speaking_test",
        cellRenderer: renderItemAvailable,
        width: 150,
      },
      {
        headerName: "Writing Evaluation",
        field: "writing_evaluation",
        cellRenderer: renderItemAvailable,
        width: 170,
      },
      {
        headerName: "Live Classes Membership",
        field: "live_classes_membership",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Online Membership",
        field: "online_membership",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Offline Membership",
        field: "offline_membership",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Group Doubt Solving",
        field: "group_doubt_solving",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "One To One Doubt Solving",
        field: "one_to_one_doubt_solving",
        cellRenderer: renderItemAvailable,
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 1) {
        return { background: "#01579b36" };
      }
      return null;
    },
  };

  return (
    <div className="ag-theme-quartz">
      <AgGridReact {...gridOptions} />
    </div>
  );
};
export default ViewPackages;
