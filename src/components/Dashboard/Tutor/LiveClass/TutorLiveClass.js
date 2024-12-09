import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as XLSX from "xlsx";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const liveClass = [
  { name: "Regular Class", value: "Regular Class" },
  { name: "Speaking Practice", value: "Speaking-Practice" },
  { name: "Group Doubt Solving", value: "Group-Doubt Solving" },
  { name: "One To One Doubt Solving", value: "One-To-One-Doubt-Solving" },
  { name: "Tutor Support", value: "Tutor Support" },
  { name: "Webinar", value: "Webinar" },
  { name: "Counselling", value: "Counselling" },
];

const columns = [
  { headerName: "First Name", field: "First Name", filter: true },
  { headerName: "Last Name", field: "Last Name", filter: true },
  { headerName: "Email", field: "Email", filter: true },
  { headerName: "Phone No.", field: "Phone No", filter: true },
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
    headerName: "Batch Start Date & Time",
    field: "Batch Start Date & Time",
    filter: true,
  },
  {
    headerName: "Batch End Date & Time",
    field: "Batch End Date & Time",
    filter: true,
  },
];

const TutorLiveClass = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveClassList, setLiveClassList] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [filters, setFilters] = useState({
    liveClass: "Regular Class",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportToExcel = () => {
    const exportData = liveClassList.map(({ no, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Live Class Report");

    XLSX.writeFile(
      workbook,
      `Live_Class_Report_${moment().format("lll")}.xlsx`
    );
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
          const data = response?.data?.flatMap((item) =>
            item.students.length > 0
              ? item.students.map((student) => ({
                  "First Name": student.first_name || "-",
                  "Last Name": student.last_name || "-",
                  Email: student.email || "-",
                  "Phone No": student.phone_no || "-",
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
                    item.select_batch
                      .map((batch) => batch.batch_name)
                      .join(", ") || "-",
                  "Batch Start Date & Time":
                    item.select_batch && item.select_batch.length > 0
                      ? moment(
                          item.select_batch[0].batch_startdate +
                            " " +
                            item.select_batch[0].batch_start_timing
                        ).format("lll")
                      : "-",
                  "Batch End Date & Time":
                    item.select_batch && item.select_batch.length > 0
                      ? moment(
                          item.select_batch[0].batch_enddate +
                            " " +
                            item.select_batch[0].batch_end_timing
                        ).format("lll")
                      : "-",
                }))
              : [
                  {
                    "First Name": "-",
                    "Last Name": "-",
                    Email: "-",
                    "Phone No": "-",
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
                      item.select_batch
                        .map((batch) => batch.batch_name)
                        .join(", ") || "-",
                    "Batch Start Date & Time":
                      item.select_batch && item.select_batch.length > 0
                        ? moment(
                            item.select_batch[0].batch_startdate +
                              " " +
                              item.select_batch[0].batch_start_timing
                          ).format("lll")
                        : "-",
                    "Batch End Date & Time":
                      item.select_batch && item.select_batch.length > 0
                        ? moment(
                            item.select_batch[0].batch_enddate +
                              " " +
                              item.select_batch[0].batch_end_timing
                          ).format("lll")
                        : "-",
                  },
                ]
          );
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
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
        <div className="dashboard__form__wraper">
          <button className="btn btn-primary" onClick={exportToExcel}>
            Export
          </button>
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
    </div>
  );
};

export default TutorLiveClass;
