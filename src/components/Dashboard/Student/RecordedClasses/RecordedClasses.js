import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import moment from "moment";

const RecordedClasses = () => {
  const category = localStorage.getItem("category");

  const [isLoading, setIsLoading] = useState(false);
  const [recordClass, setRecordClass] = useState([]);
  const [activeTab, setActiveTab] = useState("Regular Class");

  const liveClasses =
    category === "IELTS"
      ? [
          { name: "Regular", value: "Regular Class" },
          { name: "Speaking Practice", value: "Speaking-Practice" },
          { name: "Group Doubt", value: "Group Doubt Solving" },
          { name: "One To One Doubt", value: "One-To-One-Doubt-Solving" },
          { name: "Tutor Support", value: "Tutor Support" },
          { name: "Webinar", value: "Webinar" },
          { name: "Counselling", value: "Counselling" },
        ]
      : [
          { name: "Regular", value: "Regular Class" },
          { name: "Group Doubt", value: "Group Doubt Solving" },
          { name: "One To One Doubt", value: "One-To-One-Doubt-Solving" },
          { name: "Tutor Support", value: "Tutor Support" },
          { name: "Webinar", value: "Webinar" },
          { name: "Counselling", value: "Counselling" },
        ];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/liveclass/recording/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          const recordData = response?.data.filter(
            ({ recordings, live_class_type }) =>
              recordings.length > 0 && live_class_type === activeTab
          );
          setRecordClass(recordData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [activeTab]);

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const handleView = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => {
          joinNow(params.data.recordings[0].play_url);
        }}
      >
        View
      </button>
    );
  };

  const columns = [
    { headerName: "View", cellRenderer: handleView },
    { headerName: "Title", field: "meeting_title", width: 300 },
    { headerName: "Description", field: "meeting_description", width: 250 },
    {
      headerName: "Start Date & Time",
      field: "recordings",
      cellRenderer: (params) =>
        params.value.map((item) => {
          return moment(item.recording_start).format("lll");
        }),
    },
    {
      headerName: "End Date & Time",
      field: "recordings",
      cellRenderer: (params) =>
        params.value.map((item) => {
          return moment(item.recording_end).format("lll");
        }),
    },
    {
      headerName: "Password",
      field: "recordings",
      cellRenderer: (params) =>
        params.value.map((item) => {
          return item.password;
        }),
      width: 300,
    },
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                      <h4 className="flex-fill">Recorded Classes</h4>
                      <div className="d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Select Live Class</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={(e) => setActiveTab(e.target.value)}
                              value={activeTab}
                            >
                              {liveClasses.map((item) => (
                                <option key={item} value={item.value}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading text="Loading..." color="primary" />
                      ) : recordClass.length > 0 ? (
                        <Table rowData={recordClass} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Recorded Classes Available !!
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

export default RecordedClasses;
