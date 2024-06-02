import React, { useState } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import LiveClassList from "./LiveClassList";
import SmallModal from "../../../UI/Modal";
import DateRange from "../../../UI/DateRangePicker";
import RegularClass from "../RegularClass/RegularClass";
import SpeakingPractice from "../SpeakingPractice/SpeakingPractice";
import GroupDoubtSolving from "../GroupDoubtSolving/GroupDoubtSolving";
import DoubtSolving from "../1To1DoubtSolving/DoubtSolving";
import Tab from "../../../UI/Tab";

const tabs = [
  { name: "Live" },
  { name: "Regular" },
  { name: "Speaking Practice" },
  { name: "Group Dobut" },
  { name: "One TO One Doubt" },
];

const LiveClass = () => {
  const { solvingClassBook, count } = useLocation()?.state || {};
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Live");
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

  const liveClasses = () => {
    return solvingClassBook?.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange?.[0] || {};
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange(ranges.selection);
  };

  const joinNow = (zoom_meeting) => {
    window.open(zoom_meeting, "__blank");
  };

  const isWithin5Minutes = (startTime) => {
    const currentTime = moment();
    const classStartTime = moment(startTime);
    const difference = classStartTime.diff(currentTime, "milliseconds");
    return difference >= 0 && difference <= 5 * 60 * 1000;
  };

  return (
    <>
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='dashboardarea sp_bottom_100'>
            <div className='dashboard'>
              <div className='container-fluid full__width__padding'>
                <div className='row'>
                  <DSSidebar />
                  <div className='col-xl-9 col-lg-9 col-md-12'>
                    <div className='dashboard__content__wraper common-background-color-across-app'>
                      <div className='dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center'>
                        <h4 className='flex-fill'>Upcoming Live Classes</h4>
                        <div className='d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center'>
                          <div className='dashboard__form__wraper'>
                            <div className='dashboard__form__input'>
                              <label>Select Upcoming Live Class</label>
                              <select
                                className='form-select'
                                aria-label='Default select example'
                                onChange={(e) =>
                                  handleTabChange(e.target.value)
                                }
                                value={activeTab}
                              >
                                {[
                                  "Live",
                                  "Regular",
                                  "Speaking Practice",
                                  "Group Dobut",
                                  "One TO One Doubt",
                                ].map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className='dashboard__form__wraper'>
                            <div className='dashboard__form__input'>
                              <label>Select Date Range</label>
                              <DateRange
                                selectedRange={selectedDateRange}
                                onChange={handleDateRangeChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        {/* <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          // handleTabChange={handleTabChange}
                        /> */}
                        <div className='tab-content tab__content__wrapper aos-init aos-animate'>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Live" ? "show active" : ""
                            }`}
                          >
                            <div className='row'>
                              <LiveClassList
                                liveClasses={liveClasses()}
                                joinNow={joinNow}
                                isWithin5Minutes={isWithin5Minutes}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Regular" ? "show active" : ""
                            }`}
                          >
                            <div className='row'>
                              <RegularClass
                                selectedDateRange={selectedDateRange}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Speaking Practice"
                                ? "show active"
                                : ""
                            }`}
                          >
                            <div className='row'>
                              <SpeakingPractice
                                sepakingCount={count}
                                selectedDateRange={selectedDateRange}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Group Dobut" ? "show active" : ""
                            }`}
                          >
                            <div className='row'>
                              <GroupDoubtSolving
                                doubtCount={count}
                                selectedDateRange={selectedDateRange}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "One TO One Doubt"
                                ? "show active"
                                : ""
                            }`}
                          >
                            <div className='row'>
                              <DoubtSolving
                                doubtCount={count}
                                selectedDateRange={selectedDateRange}
                              />
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
        </div>
      </div>
      {/* <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        title="Live Class schedule"
        onClose={() => setIsModalOpen(false)}
        footer={
          <button
            className="default__button"
            onClick={() => setIsModalOpen(false)}
          >
            Apply
          </button>
        }
      >
        <DateRange
          selectedRange={selectedDateRange}
          onChange={handleDateRangeChange}
        />
      </SmallModal> */}
    </>
  );
};

export default LiveClass;
