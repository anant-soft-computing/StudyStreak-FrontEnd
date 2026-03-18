import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import SmallModal from "../../../UI/Modal";

const liveClass = [
  { name: "Regular Class", value: "Regular Class" },
  { name: "Speaking Practice", value: "Speaking-Practice" },
  { name: "Group Doubt Solving", value: "Group-Doubt Solving" },
  { name: "One To One Doubt Solving", value: "One-To-One-Doubt-Solving" },
  { name: "Tutor Support", value: "Tutor Support" },
  { name: "Webinar", value: "Webinar" },
  { name: "Counselling", value: "Counselling" },
];

const studentsColumns = [
  {
    headerName: "No.",
    field: "no",
    filter: true,
    cellRenderer: (params) => params.rowIndex + 1,
    width: 75,
  },
  {
    headerName: "First Name",
    field: "first_name",
    filter: true,
    width: 150,
  },
  {
    headerName: "Last Name",
    field: "last_name",
    filter: true,
    width: 150,
  },
  {
    headerName: "Email",
    field: "email",
    filter: true,
    width: 240,
  },
  {
    headerName: "Phone",
    field: "phone_no",
    filter: true,
    width: 140,
  },
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

const TutorLiveClass = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveClassList, setLiveClassList] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [filters, setFilters] = useState({
    liveClass: "Regular Class",
  });

  const [openStudents, setOpenStudents] = useState(false);
  const [students, setStudents] = useState([]);

  const [openAttachments, setOpenAttachments] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleViewStudent = (student) => {
    setOpenStudents(true);
    setStudents(student);
  };

  const handleViewAttachment = (attachment) => {
    setOpenAttachments(true);
    setAttachments(attachment);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchLiveClasses = async () => {
      if (activeTab !== "View LiveClass") return;
      setIsLoading(true);
      try {
        const { liveClass } = filters;
        const response = await ajaxCall(
          `/liveclass/student/?live_class_type=${liveClass}&start=&end=`,
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
          const data = response?.data?.map((item, index) => {
            return {
              no: index + 1,
              Action: item.start_url || "-",
              Name: item.meeting_title || "-",
              Description: item.meeting_description || "-",
              "Start Date & Time": moment(item.start_time).format("lll") || "-",
              "End Date & Time": moment(item.end_time).format("lll") || "-",
              Course:
                item.select_course
                  .map((course) => course.Course_Title)
                  .join(", ") || "-",
              Batch:
                item.select_batch.map((batch) => batch.batch_name).join(", ") ||
                "-",
              Student: item.students || "-",
              Attachments: item.attachments || "-",
            };
          });
          setLiveClassList(data);
        } else {
          setLiveClassList([]);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveClasses();
  }, [activeTab, authData?.accessToken, filters]);

  const columns = [
    { headerName: "No.", field: "no", filter: true, width: 75 },
    {
      headerName: "Action",
      field: "Action",
      filter: true,
      cellRenderer: (params) => (
        <button className="take-test" onClick={() => window.open(params.value)}>
          Start Class
        </button>
      ),
    },
    { headerName: "Live Class", field: "Name", filter: true },
    { headerName: "Description", field: "Description", filter: true },
    {
      headerName: "Live Class Start Date & Time",
      field: "Start Date & Time",
      filter: true,
    },
    {
      headerName: "Live Class End Date & Time",
      field: "End Date & Time",
      filter: true,
    },
    { headerName: "Course ", field: "Course", filter: true },
    { headerName: "Batch", field: "Batch", filter: true },
    {
      headerName: "Student",
      field: "Student",
      filter: true,
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleViewStudent(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Attachments",
      field: "Attachments",
      filter: true,
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleViewAttachment(params.value)}
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

  return (
    <div>
      <div className="col-xl-2">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Select Live Class Type</label>
            <select
              className="form-select"
              name="liveClass"
              value={filters.liveClass}
              onChange={handleFilterChange}
            >
              {liveClass.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {isLoading ? (
          <Loading />
        ) : liveClassList.length > 0 ? (
          <Table rowData={liveClassList} columnDefs={columns} />
        ) : (
          <h5 className="text-center text-danger">
            No Live Class Available !!
          </h5>
        )}
      </div>
      <SmallModal
        size="lg"
        centered
        isOpen={openStudents}
        onClose={() => setOpenStudents(false)}
        title="Students"
      >
        <Table columnDefs={studentsColumns} rowData={students} />
      </SmallModal>
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

export default TutorLiveClass;
