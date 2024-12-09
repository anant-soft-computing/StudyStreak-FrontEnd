import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openBatch, setOpenBatch] = useState(false);
  const [batchList, setBatchList] = useState([]);

  const [openLiveClass, setOpenLiveClass] = useState(false);
  const [liveClassList, setLiveClassList] = useState([]);

  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [joinClassList, setJoinClassList] = useState([]);

  const [openPackages, setOpenPackages] = useState(false);
  const [packages, setPackages] = useState([]);

  const handleBatch = (batch) => {
    setOpenBatch(true);
    setBatchList(batch);
  };

  const handleLiveClass = (liveClass) => {
    setOpenLiveClass(true);
    setLiveClassList(liveClass);
  };

  const handleJoinClass = (joinClass) => {
    setOpenJoinClass(true);
    setJoinClassList(joinClass);
  };

  const handlePackages = (packages) => {
    setOpenPackages(true);
    setPackages(packages);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/student_list_view_dashboard/",
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
          const studentWithNumbers = response?.data?.map((student, index) => ({
            ...student,
            no: index + 1,
          }));
          setStudentList(studentWithNumbers);
          setFilteredStudentList(studentWithNumbers);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [authData?.accessToken]);

  useEffect(() => {
    if (!dateRange) {
      setFilteredStudentList(studentList);
    } else {
      const startDate = moment(dateRange[0].startDate);
      const endDate = moment(dateRange[0].endDate);
      const filtered = studentList.filter((student) => {
        const studentDate = moment(student.date_joined);
        return studentDate.isBetween(startDate, endDate, "day", "[]");
      });
      setFilteredStudentList(filtered);
    }
  }, [dateRange, studentList]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 75,
    },
    { headerName: "User Name", field: "username", filter: true },
    { headerName: "Email", field: "email", filter: true },
    {
      headerName: "Registration Date",
      field: "date_joined",
      filter: true,
      cellRenderer: (params) => moment(params.value).format("lll"),
    },
    {
      headerName: "First Name",
      field: "first_name",
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "last_name",
      filter: true,
    },
    {
      headerName: "Gender",
      field: "gender",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Phone No.",
      field: "phone_no",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Whatsapp No.",
      field: "whatsapp_no",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "City",
      field: "city_name",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "State",
      field: "state_name",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Country",
      field: "country_name",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "No. of Complete Lesson",
      field: "lesson_count",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "No. Of Given Assignment",
      field: "student_assignment_count",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "No. Of Given Mini Test",
      field: "student_mock_count",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "No. Of Given Practice Test",
      field: "student_pt_count",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "No. Of Given Full Length Test",
      field: "student_flt_count",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Book Live Class",
      field: "live_classes",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleLiveClass(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Join Live Class",
      field: "live_classes_join",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleJoinClass(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Batch",
      field: "batches",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleBatch(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Package & Course (Without Batch)",
      field: "packages",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handlePackages(params.value)}
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
    <>
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
                        <h4>Student</h4>
                        <i
                          className="icofont-calendar"
                          style={{ cursor: "pointer" }}
                          onClick={() => setIsModalOpen(true)}
                        >
                          {" "}
                          Select Date
                        </i>
                      </div>
                      <div className="row">
                        {isLoading ? (
                          <Loading />
                        ) : filteredStudentList.length > 0 ? (
                          <Table
                            rowData={filteredStudentList}
                            columnDefs={columns}
                          />
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
        title="Batch Details"
        isOpen={openBatch}
        onClose={() => setOpenBatch(false)}
      >
        <div className="row">
          {batchList?.map((item, index) => (
            <div
              className="col-md-6 col-sm-12 mb-4 dashboard__recent__course__single"
              key={index}
            >
              <div className="card shadow-sm h-100">
                <div className="card-header text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{`(${index + 1}) ${
                    item?.batch_name
                  }`}</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-3">
                    <li>
                      <i className="icofont-calendar" /> <b>Date:</b>{" "}
                      {`${item?.batch_startdate} to ${item?.batch_enddate}`}
                    </li>
                    <li>
                      <i className="icofont-clock-time" /> <b>Time:</b>{" "}
                      {`${item?.batch_start_timing} to ${item?.batch_end_timing}`}
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <b>Package : </b> {item?.add_packages?.package_name}
                    </li>
                    <li>
                      <b>Course : </b> {item?.add_packages?.select_courses}
                    </li>
                    <br />
                    <li>
                      <b>Category : </b> {item?.add_packages?.coursecategory}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        title="Book Live Class"
        isOpen={openLiveClass}
        onClose={() => setOpenLiveClass(false)}
      >
        <div className="row">
          {liveClassList?.map((item, index) => (
            <div className="dashboard__recent__course__single" key={index}>
              <div className="me-3">({index + 1})</div>
              <div className="dashboard__recent__course__content">
                <div className="dashboard__recent__course__heading">
                  <h3>{item?.meeting_title}</h3>
                </div>
                <div className="dashboard__recent__course__meta text-xl-center">
                  <ul className="ps-0">
                    <li className="text-start">
                      <i className="icofont-tag" style={{ color: "#01579b" }} />{" "}
                      <b>Type</b> : {item?.liveclasstype} <br />
                      <i className="icofont-calendar" /> <b>Date & Time</b> :{" "}
                      {`${moment(item?.start_time).format("lll")} To ${moment(
                        item?.end_time
                      ).format("lll")}`}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        title="Join Live Class"
        isOpen={openJoinClass}
        onClose={() => setOpenJoinClass(false)}
      >
        <div className="row">
          {joinClassList?.map((item, index) => (
            <div className="dashboard__recent__course__single" key={index}>
              <div className="me-3">({index + 1})</div>
              <div className="dashboard__recent__course__content">
                <div className="dashboard__recent__course__heading">
                  <h3>{item?.meeting_title}</h3>
                </div>
                <div className="dashboard__recent__course__meta text-xl-center">
                  <ul className="ps-0">
                    <li className="text-start">
                      <i className="icofont-tag" style={{ color: "#01579b" }} />{" "}
                      <b>Type</b> : {item?.liveclasstype} <br />
                      <i className="icofont-calendar" /> <b>Date & Time</b> :{" "}
                      {`${moment(item?.start_time).format("lll")} To ${moment(
                        item?.end_time
                      ).format("lll")}`}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        title="Package & Course (Without Batch)"
        isOpen={openPackages}
        onClose={() => setOpenPackages(false)}
      >
        <div className="row">
          {packages?.map((item, index) => (
            <div className="dashboard__recent__course__single" key={index}>
              <div className="me-3">({index + 1})</div>
              <div className="dashboard__recent__course__content">
                <div className="dashboard__recent__course__meta text-xl-center">
                  <ul className="ps-0">
                    <li className="text-start">
                      <b>Package</b> : {item?.package_name}
                      <br />
                      <b>Course</b> : {item?.select_courses}
                      <br />
                      <b>Category</b> : {item?.coursecategory}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SmallModal>
      {isModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isModalOpen}
          title="Select Date"
          footer={
            <div className="d-flex gap-2">
              <button
                className="default__button"
                onClick={() => {
                  setDateRange(null);
                  setIsModalOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="default__button"
                onClick={() => setIsModalOpen(false)}
              >
                Apply
              </button>
            </div>
          }
          onClose={() => setIsModalOpen(false)}
        >
          <DateRangePicker
            ranges={
              dateRange || [
                {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                },
              ]
            }
            onChange={(item) => setDateRange([item.selection])}
            rangeColors={["#3d91ff"]}
          />
        </SmallModal>
      )}
    </>
  );
};

export default Student;
