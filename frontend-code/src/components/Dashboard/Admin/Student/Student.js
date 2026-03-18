import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const [openBatch, setOpenBatch] = useState(false);
  const [batchDetails, setBatchDetails] = useState([]);

  const [openPackages, setOpenPackages] = useState(false);
  const [packageDeails, setPackageDeails] = useState([]);

  const handleBatch = async (batchIds) => {
    try {
      setIsLoading(true);
      const batchPromises = batchIds?.map((batchId) =>
        ajaxCall(
          `/batch/${batchId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
            },
            method: "GET",
          },
          8000
        )
      );

      const responses = await Promise.all(batchPromises);
      const validBatchDetails = responses
        ?.filter((response) => response?.status === 200)
        ?.map((response) => response?.data);

      setBatchDetails(validBatchDetails);
      setOpenBatch(true);
    } catch (error) {
      console.log("Error fetching batch details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePackages = async (packageIds) => {
    try {
      setIsLoading(true);
      const packagePromises = packageIds?.map((packageId) =>
        ajaxCall(
          `/package/${packageId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
            },
            method: "GET",
          },
          8000
        )
      );

      const responses = await Promise.all(packagePromises);
      const validPackageDetails = responses
        ?.filter((response) => response?.status === 200)
        ?.map((response) => response?.data);

      setPackageDeails(validPackageDetails);
      setOpenPackages(true);
    } catch (error) {
      console.log("Error fetching package details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/admin/student-dashboard/",
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
          setStudentList(
            response?.data.sort(
              (a, b) => new Date(b.date_joined) - new Date(a.date_joined)
            )
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [authData?.accessToken]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 75,
      cellRenderer: (params) => params.rowIndex + 1,
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
      headerName: "City",
      field: "city",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "State",
      field: "state",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Country",
      field: "country",
      filter: true,
      cellRenderer: (params) => {
        return params.value ? <div>{params.value}</div> : "-";
      },
    },
    {
      headerName: "Batch",
      field: "batch_ids",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleBatch(params.value)}
            style={{ minWidth: "80px" }}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Package",
      field: "package_ids",
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handlePackages(params.value)}
            style={{ minWidth: "80px" }}
          >
            View
          </button>
        ) : (
          "-"
        );
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
  ];

  return (
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
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : studentList.length > 0 ? (
                        <Table rowData={studentList} columnDefs={columns} />
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
      <SmallModal
        size="lg"
        centered
        title="Batch Details"
        isOpen={openBatch}
        onClose={() => setOpenBatch(false)}
      >
        <div className="container-fluid">
          {batchDetails?.length === 0 ? (
            <div className="text-center py-4">
              <div className="alert alert-info">No batch details available</div>
            </div>
          ) : (
            <div className="row g-4">
              {batchDetails?.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "12px",
                      borderLeft: "4px solid #6777ef",
                    }}
                  >
                    <div
                      className="card-header bg-white d-flex justify-content-between align-items-center"
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.1)",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    >
                      <h5 className="mb-0 text-success">
                        {item?.batch_name || `Batch ${index + 1}`}
                      </h5>
                      <span className="badge bg-success">#{index + 1}</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">Schedule</h6>
                        <div className="d-flex justify-content-between">
                          <div>
                            <small className="text-muted">Start</small>
                            <p className="mb-0 fw-bold">
                              {item?.batch_startdate}
                            </p>
                            <small className="text-muted">
                              {item?.batch_start_timing}
                            </small>
                          </div>
                          <div>
                            <small className="text-muted">End</small>
                            <p className="mb-0 fw-bold">
                              {item?.batch_enddate}
                            </p>
                            <small className="text-muted">
                              {item?.batch_end_timing}
                            </small>
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <div className="mb-3">
                        <h6 className="text-muted mb-2">Package Details</h6>
                        {item?.add_packages ? (
                          <>
                            <p className="mb-1">
                              <span className="fw-bold">Name:</span>
                              {item?.add_packages?.package_name}
                            </p>
                            <p className="mb-1">
                              <span className="fw-bold">Course:</span>
                              {item?.add_packages?.select_courses}
                            </p>
                            <p className="mb-0">
                              <span className="fw-bold">Category:</span>
                              {item?.add_packages?.coursecategory}
                            </p>
                          </>
                        ) : (
                          <p className="text-muted">No package information</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        title="Package & Course Details"
        isOpen={openPackages}
        onClose={() => setOpenPackages(false)}
      >
        <div className="container-fluid">
          {packageDeails?.length === 0 ? (
            <div className="text-center py-4">
              <div className="alert alert-info">
                No package details available
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {packageDeails?.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "12px",
                      borderLeft: "4px solid #28a745",
                    }}
                  >
                    <div
                      className="card-header bg-white d-flex justify-content-between align-items-center"
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.1)",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    >
                      <h5 className="mb-0 text-success">
                        {item?.package_name || `Package ${index + 1}`}
                      </h5>
                      <span className="badge bg-success">#{index + 1}</span>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <h6 className="text-muted mb-3">Course Information</h6>
                        <div>
                          <small className="text-muted">Course</small>
                          <p className="mb-0 fw-bold">{item?.select_courses}</p>
                        </div>
                        <div>
                          <small className="text-muted">Category</small>
                          <p className="mb-0 fw-bold">{item?.coursecategory}</p>
                        </div>
                      </div>
                      <hr className="my-3" />
                      <div>
                        <h6 className="text-muted mb-2">Package Information</h6>
                        <div className="d-flex align-items-center mb-2">
                          <div>
                            <small className="text-muted">Package</small>
                            <p className="mb-0 fw-bold">{item?.package_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SmallModal>
    </div>
  );
};

export default Student;
