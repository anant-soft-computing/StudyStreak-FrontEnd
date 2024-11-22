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

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/user-list/",
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
          const userWithNumbers = response?.data?.map((user, index) => ({
            ...user,
            no: index + 1,
          }));
          setUserList(userWithNumbers);
          setFilteredUserList(userWithNumbers);
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
      setFilteredUserList(userList);
    } else {
      const startDate = moment(dateRange[0].startDate);
      const endDate = moment(dateRange[0].endDate);
      const filtered = userList.filter((user) => {
        const userDate = moment(user.date_joined);
        return userDate.isBetween(startDate, endDate, "day", "[]");
      });
      setFilteredUserList(filtered);
    }
  }, [dateRange, userList]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 80,
    },
    { headerName: "User Name", field: "username", filter: true, width: 250 },
    { headerName: "Email", field: "email", filter: true, width: 250 },
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
      headerName: "Registration Date",
      field: "date_joined",
      filter: true,
      width: 225,
      cellRenderer: (params) => moment(params.value).format("lll"),
    },
    {
      headerName: "Last Login",
      field: "last_login",
      filter: true,
      width: 225,
      cellRenderer: (params) => {
        return params.value ? (
          <div>{moment(params.value).format("lll")}</div>
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
                        <h4>Users</h4>
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
                        ) : filteredUserList.length > 0 ? (
                          <Table
                            rowData={filteredUserList}
                            columnDefs={columns}
                          />
                        ) : (
                          <h5 className="text-center text-danger">
                            No Users Available !!
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

export default Users;
