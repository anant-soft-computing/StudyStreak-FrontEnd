import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";

const attachmentsColumns = [
  {
    headerName: "No.",
    field: "no",
    filter: true,
    cellRenderer: (params) => params.rowIndex + 1,
    width: 110,
  },
  {
    headerName: "Description",
    field: "file_name",
    filter: true,
    width: 450,
  },
  {
    headerName: "Download",
    field: "attachment",
    filter: true,
    width: 200,
    cellRenderer: (params) => {
      return params.value !== null ? (
        <button
          className="take-test"
          onClick={() => window.open(params.value)}
        >
          <i className="icofont-download" /> Download
        </button>
      ) : (
        "-"
      );
    },
  },
];

const ViewLiveClasses = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveClassList, setLiveClassList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const [openAttachments, setOpenAttachments] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleAttachment = (batch) => {
    setOpenAttachments(true);
    setAttachments(batch);
  };

  useEffect(() => {
    const fetchLiveClasses = async () => {
      if (activeTab !== "View LiveClass") return;
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/liveclass_list_view/`,
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
          const liveClassWithNumbers = response.data.map(
            (liveClass, index) => ({
              ...liveClass,
              no: index + 1,
            })
          );
          setLiveClassList(liveClassWithNumbers);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveClasses();
  }, [activeTab, authData?.accessToken]);

  const columns = [
    { headerName: "No.", field: "no", resizable: false, width: 60 },
    {
      headerName: "Meeting Name",
      field: "meeting_title",
      filter: true,
      width: 280,
    },
    {
      headerName: "Live Class Type",
      field: "liveclasstype",
      filter: true,
      width: 280,
    },
    {
      headerName: "Start Date",
      field: "start_time",
      filter: true,
      valueFormatter: ({ value }) => moment(value).format("lll"),
      width: 200,
    },
    {
      headerName: "End Date",
      field: "end_time",
      filter: true,
      valueFormatter: ({ value }) => moment(value).format("lll"),
      width: 200,
    },
    {
      headerName: "Batch",
      field: "select_batch",
      filter: true,
      width: 280,
      cellRenderer: ({ data }) => (
        <div>
          {data.select_batch?.map((item) => item.batch_name).join(", ") || "-"}
        </div>
      ),
    },
    {
      headerName: "Course",
      field: "select_course",
      filter: true,
      width: 280,
      cellRenderer: ({ data }) => (
        <div>
          {data.select_course?.map((item) => item.Course_Title).join(", ") ||
            "-"}
        </div>
      ),
    },
    {
      headerName: "Attachments",
      field: "attachments",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleAttachment(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (liveClassList.length === 0) {
    return (
      <h5 className="text-center text-danger">No Live Classes Available !!</h5>
    );
  }

  return (
    <div>
      <Table columnDefs={columns} rowData={liveClassList} />
      <SmallModal
        size="lg"
        centered
        isOpen={openAttachments}
        onClose={() => setOpenAttachments(false)}
        title="Attachments"
      >
        <Table columnDefs={attachmentsColumns} rowData={attachments} />
      </SmallModal>
    </div>
  );
};

export default ViewLiveClasses;
