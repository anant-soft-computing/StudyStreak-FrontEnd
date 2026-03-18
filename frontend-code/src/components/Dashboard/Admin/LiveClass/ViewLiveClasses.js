import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";

const liveClass = [
  { name: "Regular Class", value: "Regular Class" },
  { name: "Speaking Practice", value: "Speaking-Practice" },
  { name: "Group Doubt Solving", value: "Group-Doubt Solving" },
  { name: "One To One Doubt Solving", value: "One-To-One-Doubt-Solving" },
  { name: "Tutor Support", value: "Tutor Support" },
  { name: "Webinar", value: "Webinar" },
  { name: "Counselling", value: "Counselling" },
  { name: "Demo", value: "Demo" },
  { name: "Master", value: "Master" },
];

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
        <button className="take-test" onClick={() => window.open(params.value)}>
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
  const [liveClassType, setLiveClassType] = useState("Regular Class");

  const [attachments, setAttachments] = useState([]);
  const [openAttachments, setOpenAttachments] = useState(false);

  const authData = useSelector((state) => state.authStore);

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
          `/liveclass_list_view/?live_class_type=${liveClassType}`,
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
          setLiveClassList(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveClasses();
  }, [activeTab, authData?.accessToken, liveClassType]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 60,
      cellRenderer: (params) => params.rowIndex + 1,
    },
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

  return (
    <div>
      <div className="col-xl-2 mb-4">
        <div className="dashboard__select__heading">
          <span>Live Class Type</span>
        </div>
        <div className="dashboard__selector">
          <select
            className="form-select"
            aria-label="Default select example"
            value={liveClassType}
            onChange={(e) => setLiveClassType(e.target.value)}
          >
            {liveClass.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : liveClassList.length > 0 ? (
        <Table columnDefs={columns} rowData={liveClassList} />
      ) : (
        <h5 className="text-center text-danger">
          No Live Classes Available !!
        </h5>
      )}
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
