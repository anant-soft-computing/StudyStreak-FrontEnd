import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import DateRange from "../../../UI/DateRangePicker";
import RegularClass from "../RegularClass/RegularClass";
import SpeakingPractice from "../SpeakingPractice/SpeakingPractice";
import GroupDoubtSolving from "../GroupDoubtSolving/GroupDoubtSolving";
import DoubtSolving from "../1To1DoubtSolving/DoubtSolving";
import ajaxCall from "../../../../helpers/ajaxCall";
import Webinar from "../Webinar/Webinar";
import TutorSupport from "../TutorSpport/TutorSupport";
import Counselling from "../Counselling/Counselling";
import moment from "moment";
import StatusBox from "../Classes/StatusBox";
import BuyCourse from "../BuyCourse/BuyCourse";

const LiveClass = () => {
  const location = useLocation();
  const category = localStorage.getItem("category");

  const liveClasses = [
    "Regular",
    ...(category === "IELTS" ? ["Speaking Practice"] : []),
    "Group Doubt",
    "One To One Doubt",
    "Tutor Support",
    "Webinar",
    "Counselling",
  ];

  const [count, setCount] = useState({
    webinar_count: 0,
    counselling_count: 0,
    tutor_support_count: 0,
    speaking_practice_count: 0,
    group_doubt_solving_count: 0,
    one_to_one_doubt_solving_count: 0,
  });
  const [solvingClassBook, setSolvingClassBook] = useState([]);
  const [regularClassData, setRegularClassData] = useState([]);
  const [speakingPracticeData, setSpeakingPracticeData] = useState([]);
  const [groupDoubtSolvingData, setGroupDoubtSolvingData] = useState([]);
  const [oneToOneDoubtData, setOneToOneDoubtData] = useState([]);
  const [tutorSupportData, setTutorSupportData] = useState([]);
  const [webinarData, setWebinarData] = useState([]);
  const [counsellingData, setCounsellingData] = useState([]);
  const [highlightedRanges, setHighlightedRanges] = useState([]);

  const [activeTab, setActiveTab] = useState(() => {
    const tab = location?.state?.activeTab;
    return liveClasses.includes(tab) ? tab : "Regular";
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const updateHighlightedRanges = () => {
      let data = [];

      switch (activeTab) {
        case "Regular":
          data = regularClassData;
          break;
        case "Speaking Practice":
          data = speakingPracticeData;
          break;
        case "Group Doubt":
          data = groupDoubtSolvingData;
          break;
        case "One To One Doubt":
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

      const ranges = data.map((item) => ({
        start: moment(item.start_time).toDate(),
        end: moment(item.end_time).toDate(),
      }));

      setHighlightedRanges(ranges);
    };

    updateHighlightedRanges();
  }, [
    activeTab,
    regularClassData,
    speakingPracticeData,
    groupDoubtSolvingData,
    oneToOneDoubtData,
    tutorSupportData,
    webinarData,
    counsellingData,
  ]);

  useEffect(() => {
    const calculateTotalCount = (data, key) =>
      data?.package.reduce((sum, pkg) => sum + (pkg[key] || 0), 0);

    (async () => {
      try {
        const response = await ajaxCall(
          "/userwisepackagewithcourseid/",
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
          const { data } = response;

          const counts = {
            speaking_practice_count: calculateTotalCount(
              data,
              "speaking_practice_count"
            ),
            one_to_one_doubt_solving_count: calculateTotalCount(
              data,
              "one_to_one_doubt_solving_count"
            ),
            group_doubt_solving_count: calculateTotalCount(
              data,
              "group_doubt_solving_count"
            ),
            webinar_count: calculateTotalCount(data, "webinar_count"),
            tutor_support_count: calculateTotalCount(
              data,
              "tutor_support_count"
            ),
            counselling_count: calculateTotalCount(data, "counselling_count"),
          };

          setCount(counts);
          setSolvingClassBook(data?.student[0]?.Live_class_enroll);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleDataFetch = (data) => {
    switch (activeTab) {
      case "Regular":
        setRegularClassData(data);
        break;
      case "Speaking Practice":
        setSpeakingPracticeData(data);
        break;
      case "Group Doubt":
        setGroupDoubtSolvingData(data);
        break;
      case "One To One Doubt":
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
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Regular":
        return (
          <RegularClass
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "Speaking Practice":
        return (
          <SpeakingPractice
            count={count.speaking_practice_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "Group Doubt":
        return (
          <GroupDoubtSolving
            count={count.group_doubt_solving_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "One To One Doubt":
        return (
          <DoubtSolving
            count={count.one_to_one_doubt_solving_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "Tutor Support":
        return (
          <TutorSupport
            count={count.tutor_support_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "Webinar":
        return (
          <Webinar
            count={count.webinar_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      case "Counselling":
        return (
          <Counselling
            count={count.counselling_count}
            solvingClassBook={solvingClassBook}
            selectedDate={selectedDate}
            onDataFetch={handleDataFetch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                {location?.state?.packageCount !== 0 && (
                  <div className="col-lg-auto col-md-12 ">
                    <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                      <h4 className="flex-fill">Select Date</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                      <DateRange
                        inline
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
                      <h4 className="flex-fill">Live Classes</h4>
                      {location?.state?.packageCount !== 0 && (
                        <div className="d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Select Live Class</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) =>
                                  handleTabChange(e.target.value)
                                }
                                value={activeTab}
                              >
                                {liveClasses.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {location?.state?.packageCount === 0 ? (
                      <BuyCourse message="No Live Class Available, Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          {renderTab()}
                        </div>
                      </div>
                    )}
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

export default LiveClass;
