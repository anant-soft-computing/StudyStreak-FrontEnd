import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Loading from "../../../../UI/Loading";
import Table from "../../../../UI/Table";

const FullLengthTestReport = ({ activeTab }) => {
  const navigate = useNavigate();

  const [fltData, setFltData] = useState([]);
  const [totalFLT, setTotalFLT] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab === "Full Length Test") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/get-student-flt/",
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
          if (response.status === 200) {
            const data = response.data[0].student_flt.map((item, index) => {
              return {
                ...item,
                no: index + 1,
              };
            });
            setFltData(data);
            setTotalFLT(response.data[0].total_flt);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      })();
    }
  }, [activeTab]);

  const columns = [
    { headerName: "No.", field: "no", resizable: false, width: 80 },
    {
      headerName: "Name",
      field: "name",
      filter: true,
      width: 400,
    },
    {
      headerName: "View",
      filter: true,
      cellRenderer: (params) => {
        return (
          <button
            className="take-test"
            onClick={() =>
              navigate(`/exam-fulllength-answer/${params.data.id}`)
            }
          >
            View
          </button>
        );
      },
      width: 235,
    },
  ];

  return (
    <div>
      <div className="mainWrapper">
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="wrap_item_icon">
            <i className="icofont-justify-all text-info icofont-md" />(
            {fltData?.length}) Given Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-list text-success icofont-md" />(
            {totalFLT - fltData?.length}) Available Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-ui-copy text-secondary icofont-md"></i>(
            {totalFLT}) Total Tests
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : fltData?.length > 0 ? (
        <div className="col-xl-6">
          <Table rowData={fltData} columnDefs={columns} />
        </div>
      ) : (
        <h5 className="text-center text-danger">
          Not Given Any Full Length Test !!
        </h5>
      )}
    </div>
  );
};

export default FullLengthTestReport;
