import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewFLT = ({ activeTab }) => {
  const [fltList, setFltList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authData = useSelector((state) => state.authStore);

  const fetchData = useCallback(
    async (url, setDataCallback) => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          url,
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
          setDataCallback(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [authData?.accessToken]
  );

  useEffect(() => {
    if (activeTab !== "View FLT") return;

    fetchData("/get/flt/", setFltList);
  }, [activeTab, authData.accessToken, fetchData]);

  if (isLoading) {
    return <Loading />;
  }

  if (fltList.length === 0) {
    return (
      <h5 className="text-center text-danger">
        No Full Length Test Available !!
      </h5>
    );
  }

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 110,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Exam Name",
      field: "name",
      filter: true,
      width: 260,
    },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
      width: 265,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
      width: 265,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
      width: 265,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
      width: 265,
    },
  ];

  return <Table rowData={fltList} columnDefs={columns} />;
};

export default ViewFLT;
