import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import DateRange from "../../../UI/DateRangePicker";
import StatusBox from "../Classes/StatusBox";
import { filterByDateRange } from "../Classes/filterByDateRange";
import BuyCourse from "../BuyCourse/BuyCourse";

const RecordedClasses = () => {
  const { packageCount } = useLocation().state || {};
  const category = localStorage.getItem("category");

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

  const [isLoading, setIsLoading] = useState(false);
  const [recordClass, setRecordClass] = useState([]);

  const [activeTab, setActiveTab] = useState("Regular Class");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [regularClassData, setRegularClassData] = useState([]);
  const [speakingPracticeData, setSpeakingPracticeData] = useState([]);
  const [groupDoubtSolvingData, setGroupDoubtSolvingData] = useState([]);
  const [oneToOneDoubtData, setOneToOneDoubtData] = useState([]);
  const [tutorSupportData, setTutorSupportData] = useState([]);
  const [webinarData, setWebinarData] = useState([]);
  const [counsellingData, setCounsellingData] = useState([]);
  const [highlightedRanges, setHighlightedRanges] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const updateHighlightedRanges = () => {
      let data = [];

      switch (activeTab) {
        case "Regular Class":
          data = regularClassData;
          break;
        case "Speaking-Practice":
          data = speakingPracticeData;
          break;
        case "Group Doubt Solving":
          data = groupDoubtSolvingData;
          break;
        case "One-To-One-Doubt-Solving":
          data = oneToOneDoubtData;
          break;
        case "Tutor Support":
          data = tutorSupportData;
          break;
        case "Webinar":
          data = webinarData;
          break;
        case "Counselling":
          data = counsellingData;
          break;
        default:
          data = [];
      }

      const ranges = data.flatMap((item) =>
        item.recordings.map((recording) => ({
          start: moment(recording.recording_start).toDate(),
          end: moment(recording.recording_end).toDate(),
        }))
      );

      setHighlightedRanges(ranges);
    };

    updateHighlightedRanges();
  }, [
    activeTab,
    regularClassData,
    groupDoubtSolvingData,
    oneToOneDoubtData,
    tutorSupportData,
    webinarData,
    counsellingData,
    speakingPracticeData,
  ]);

  const handleDataFetch = useCallback(
    (data) => {
      switch (activeTab) {
        case "Regular Class":
          setRegularClassData(data);
          break;
        case "Speaking-Practice":
          setSpeakingPracticeData(data);
          break;
        case "Group Doubt Solving":
          setGroupDoubtSolvingData(data);
          break;
        case "One-To-One-Doubt-Solving":
          setOneToOneDoubtData(data);
          break;
        case "Tutor Support":
          setTutorSupportData(data);
          break;
        case "Webinar":
          setWebinarData(data);
          break;
        case "Counselling":
          setCounsellingData(data);
          break;
        default:
          break;
      }
    },
    [activeTab]
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/liveclass/recording/?class_type=${activeTab}`,
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
            ({ recordings }) => recordings.length > 0
          );
          handleDataFetch(recordData);
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
  }, [activeTab, handleDataFetch]);

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const formatRecordClasses = recordClass.flatMap((item, index) => {
    const baseData = {
      no: `${index + 1}.`,
      title: item.meeting_title,
    };

    return item.recordings.map((recording, recordingIndex) => ({
      ...baseData,
      no: `${index + 1}.${recordingIndex + 1}`,
      start_time: moment(recording.recording_start).format("lll"),
      end_time: moment(recording.recording_end).format("lll"),
      playUrl: recording.play_url,
      password: recording.password,
    }));
  });

  const recordClasses = formatRecordClasses.filter(({ start_time, end_time }) =>
    filterByDateRange(start_time, end_time, selectedDate)
  );

  const columns = [
    {
      headerName: "View",
      cellRenderer: (params) => (
        <button
          className="take-test"
          onClick={() => joinNow(params.data.playUrl)}
        >
          View
        </button>
      ),
    },
    { headerName: "Title", field: "title", width: 250 },
    { headerName: "Start Date & Time", field: "start_time", width: 250 },
    { headerName: "End Date & Time", field: "end_time", width: 250 },
    { headerName: "Password", field: "password", width: 220 },
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                {packageCount !== 0 && (
                  <div className="col-lg-auto col-md-12 ">
                    <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                      <h4 className="flex-fill">Select Date</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                      <DateRange
                        inline
                        type="Recorded Classes"
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                        highlightedRanges={highlightedRanges}
                      />
                    </div>
                    <StatusBox />
                  </div>
                )}
                <div className="col">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                      <h4 className="flex-fill">Recorded Classes</h4>
                      {packageCount !== 0 && (
                        <div className="d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Select Recorded Class</label>
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
                      )}
                    </div>
                    <div className="row">
                      {packageCount === 0 ? (
                        <BuyCourse message="No Recorded Classes Available, Please Buy a Course !!" />
                      ) : isLoading ? (
                        <Loading />
                      ) : recordClasses.length > 0 ? (
                        <Table rowData={recordClasses} columnDefs={columns} />
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
