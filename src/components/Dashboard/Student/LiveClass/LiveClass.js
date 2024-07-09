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

const liveClasses = [
  "Regular",
  "Speaking Practice",
  "Group Dobut",
  "One TO One Doubt",
  "Tutor Support",
  "Webinar",
  "Counselling",
];

const LiveClass = () => {
  const location = useLocation();
  const [count, setCount] = useState({});
  const [solvingClassBook, setSolvingClassBook] = useState([]);

  const [activeTab, setActiveTab] = useState(() => {
    const tab = location?.state?.activeTab;
    return liveClasses.includes(tab) ? tab : "Regular";
  });

  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange(ranges.selection);
  };

  useEffect(() => {
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
          const studentPackage = data?.student_packages?.[0];
          const packageDetails = studentPackage?.package;
          setCount({
            speaking_test_count: packageDetails?.speaking_test_count || 0,
            one_to_one_doubt_solving_count:
              packageDetails?.one_to_one_doubt_solving_count || 0,
            group_doubt_solving_count:
              packageDetails?.group_doubt_solving_count || 0,
          });
          setSolvingClassBook(
            data.student_packages?.map(
              ({ Live_class_enroll }) => Live_class_enroll
            )[0]
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "Regular":
        return <RegularClass selectedDateRange={selectedDateRange} />;
      case "Speaking Practice":
        return (
          <SpeakingPractice
            count={count.speaking_test_count}
            solvingClassBook={solvingClassBook}
            selectedDateRange={selectedDateRange}
          />
        );
      case "Group Dobut":
        return (
          <GroupDoubtSolving
            count={count.group_doubt_solving_count}
            solvingClassBook={solvingClassBook}
            selectedDateRange={selectedDateRange}
          />
        );
      case "One TO One Doubt":
        return (
          <DoubtSolving
            count={count.one_to_one_doubt_solving_count}
            solvingClassBook={solvingClassBook}
            selectedDateRange={selectedDateRange}
          />
        );
      case "Tutor Support":
        return <TutorSupport />;
      case "Webinar":
        return <Webinar />;
      case "Counselling":
        return <Counselling />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-lg-auto col-md-12 ">
                    <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                      <h4 className="flex-fill">Select Date Range</h4>
                    </div>
                    <div className="d-flex justify-content-center ">
                      <DateRange
                        selectedRange={selectedDateRange}
                        onChange={handleDateRangeChange}
                        inline
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center">
                        <h4 className="flex-fill">Upcoming Live Classes</h4>
                        <div className="d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Select Upcoming Live Class</label>
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
                      </div>
                      <div className="row">
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          {renderTab()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveClass;
