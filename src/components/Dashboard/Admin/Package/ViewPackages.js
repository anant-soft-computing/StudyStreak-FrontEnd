import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

export const checkIcon = () => {
  return (
    <i className="icofont-check-circled text-success icofont-md icofont-bold"></i>
  );
};

export const cancelIcon = () => {
  return (
    <i className="icofont-close-circled text-danger icofont-md icofont-bold"></i>
  );
};

const ViewPackages = () => {
  const [packageList, setPackageList] = useState([]);

  const getPackages = async () => {
    try {
      const response = await ajaxCall(
        `/packagelistview`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
  };

  useEffect(() => {
    getPackages();
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? checkIcon() : cancelIcon();
  };

  const gridOptions = {
    rowData: packageList,
    columnDefs: [
      { headerName: "No.", field: "no", filter: true },
      { headerName: "Name", field: "package_name", filter: true },
      { headerName: "Price", field: "package_price", filter: true },
      { headerName: "Type", field: "PackageType.name", filter: true },
      {
        headerName: "Course",
        field: "select_course.Course_Title",
        filter: true,
      },
      { headerName: "Duration", field: "duration"},
      {
        headerName: "Coupon Code",
        field: "coupon_code.cupon_code",
      },
      {
        headerName: "Soft Copy",
        field: "soft_copy",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Hard Copy",
        field: "hard_copy",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Full Length Test",
        field: "full_length_test",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Practice Test",
        field: "practice_test",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Speaking Test",
        field: "speaking_test",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Writing Evaluation",
        field: "writing_evaluation",
        cellRenderer: renderItemAvailable,
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
export default ViewPackages;
