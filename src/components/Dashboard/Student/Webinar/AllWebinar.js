import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import DateRange from "../../../UI/DateRangePicker";
import List from "../Classes/List";
import moment from "moment";

const AllWebinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange(ranges.selection);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/liveclass_list_view/`,
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
        if (response?.status === 200) {
          setWebinars(
            response?.data?.filter(
              ({ liveclasstype }) => liveclasstype === "Webinar"
            )
          );
          setIsLoading(false);
        } else {
          console.log("error");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);


  const webinarsData = () => {
    return webinars.filter((item) => {
      const classDate = moment(item.start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange?.[0];
      if (startDate && !endDate) {
        return classDate === moment(startDate).format("YYYY-MM-DD");
      }
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  return (
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
                      <h4 className="flex-fill">Webinars</h4>
                    </div>
                    <div className="row">
                      <List
                        classes={webinarsData()}
                        isLoading={isLoading}
                        message="No Webinar Available Today !! , Please Schedule Your Webinar."
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
  );
};

export default AllWebinar;
