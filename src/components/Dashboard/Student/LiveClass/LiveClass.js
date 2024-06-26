import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import DateRange from "../../../UI/DateRangePicker";
import RegularClass from "../RegularClass/RegularClass";
import SpeakingPractice from "../SpeakingPractice/SpeakingPractice";
import GroupDoubtSolving from "../GroupDoubtSolving/GroupDoubtSolving";
import DoubtSolving from "../1To1DoubtSolving/DoubtSolving";

const LiveClass = () => {
  const { count } = useLocation()?.state || {};
  const [activeTab, setActiveTab] = useState("Regular");
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

  return (
    <>
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='dashboardarea sp_bottom_100'>
            <div className='dashboard'>
              <div className='container-fluid full__width__padding'>
                <div className='row'>
                  <DSSidebar />
                  <div className='col-lg-auto col-md-12 '>
                    {/* <div className='dashboard__content__wraper common-background-color-across-app'> */}
                    <div className='dashboard__section__title gap-2 flex-column flex-md-row align-items-start align-items-md-center'>
                      <h4 className='flex-fill'>Select Date Range</h4>
                    </div>
                    {/* <div className='row'>
                        <div className='dashboard__form__wraper'>
                          <div className='dashboard__form__input d-flex justify-content-center'> */}
                    <div className='d-flex justify-content-center '>
                      <DateRange
                        selectedRange={selectedDateRange}
                        onChange={handleDateRangeChange}
                        inline
                      />
                    </div>
                    {/* </div>
                        </div>
                      </div> */}
                    {/* </div> */}
                  </div>
                  <div className='col'>
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
                        </div>
                      </div>
                      <div className='row'>
                        <div className='tab-content tab__content__wrapper aos-init aos-animate'>
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
    </>
  );
};

export default LiveClass;
