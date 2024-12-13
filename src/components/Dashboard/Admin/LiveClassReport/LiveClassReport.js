import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as XLSX from "xlsx";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
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

const LiveClassReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [filters, setFilters] = useState({
    liveClass: "Regular Class",
    start: "",
    end: "",
  });

  const [openAttachments, setOpenAttachments] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const authData = useSelector((state) => state.authStore);

  const handleAttachment = (batch) => {
    setOpenAttachments(true);
    setAttachments(batch);
  };

  useEffect(() => {
    const fetchFilteredClasses = async () => {
      setIsLoading(true);
      try {
        const { liveClass, start, end } = filters;
        const response = await ajaxCall(
          `/liveclass/student/?live_class_type=${liveClass}&start=${start}&end=${end}`,
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
          const data = response?.data?.flatMap((item) =>
            item.students.map((student) => ({
              "First Name": student.first_name || "-",
              "Last Name": student.last_name || "-",
              Email: student.email || "-",
              "Phone No": student.phone_no || "-",
              "Tutor Name":
                item.tutor.first_name + " " + item.tutor.last_name || "-",
              "Live Class": item.meeting_title || "-",
              "Live Class Start Date & Time":
                moment(item.start_time).format("lll") || "-",
              "Live Class End Date & Time":
                moment(item.end_time).format("lll") || "-",
              Course:
                item.select_course
                  .map((course) => course.Course_Title)
                  .join(", ") || "-",
              Batch:
                item.select_batch.map((batch) => batch.batch_name).join(", ") ||
                "-",
              Attachments: item.attachments || "-",
            }))
          );
          setStudentData(data);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        setStudentData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredClasses();
  }, [authData?.accessToken, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportToExcel = () => {
    const exportData = studentData.map(({ no, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Live Class Report");

    XLSX.writeFile(
      workbook,
      `Live_Class_Report_${moment().format("lll")}.xlsx`
    );
  };

  const columns = [
    { headerName: "First Name", field: "First Name", filter: true },
    { headerName: "Last Name", field: "Last Name", filter: true },
    { headerName: "Email", field: "Email", filter: true },
    { headerName: "Phone No.", field: "Phone No", filter: true },
    { headerName: "Tutor Name", field: "Tutor Name", filter: true },
    { headerName: "Live Class", field: "Live Class", filter: true },
    {
      headerName: "Live Class Start Date & Time",
      field: "Live Class Start Date & Time",
      filter: true,
    },
    {
      headerName: "Live Class End Date & Time",
      field: "Live Class End Date & Time",
      filter: true,
    },
    { headerName: "Course ", field: "Course", filter: true },
    { headerName: "Batch", field: "Batch", filter: true },
    {
      headerName: "Attachments",
      field: "Attachments",
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
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DASideBar />
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="dashboard__section__title">
                        <h4>Live Class Report</h4>
                        <div className="d-flex flex-wrap gap-3 align-items-center">
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
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Start Date</label>
                              <input
                                type="date"
                                name="start"
                                value={filters.start}
                                onChange={handleFilterChange}
                              />
                            </div>
                          </div>
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>End Date</label>
                              <input
                                type="date"
                                name="end"
                                value={filters.end}
                                onChange={handleFilterChange}
                              />
                            </div>
                          </div>
                          {studentData.length > 0 && (
                            <div className="dashboard__form__wraper">
                              <button
                                className="btn btn-primary"
                                onClick={exportToExcel}
                              >
                                Export
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        {isLoading ? (
                          <Loading />
                        ) : studentData.length > 0 ? (
                          <Table rowData={studentData} columnDefs={columns} />
                        ) : (
                          <h5 className="text-center text-danger">
                            No Students Available !!
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default LiveClassReport;
