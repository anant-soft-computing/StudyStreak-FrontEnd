import React, { useEffect, useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import Loading from "../../../UI/Loading";
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

const LiveClassReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentClasses, setStudentClasses] = useState([]);
  const [filters, setFilters] = useState({
    liveClass: "",
    start: "",
    end: "",
  });

  const authData = useSelector((state) => state.authStore);

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
          const studentWithNumbers = response?.data?.map((student, index) => ({
            ...student,
            no: index + 1,
          }));
          setStudentClasses(studentWithNumbers);
        } else {
          setStudentClasses([]);
        }
      } catch (error) {
        setStudentClasses([]);
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

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 75,
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
    { headerName: "Email", field: "email", filter: true },
    {
      headerName: "Phone No.",
      field: "phone_no",
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
                      <h4>Live Class Report</h4>
                      <div className="d-flex flex-wrap gap-3">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Select Live Class Type</label>
                            <select
                              className="form-select"
                              name="liveClass"
                              value={filters.liveClass}
                              onChange={handleFilterChange}
                            >
                              <option value="">All</option>
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
                      </div>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : studentClasses.length > 0 ? (
                        <Table rowData={studentClasses} columnDefs={columns} />
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
  );
};

export default LiveClassReport;
