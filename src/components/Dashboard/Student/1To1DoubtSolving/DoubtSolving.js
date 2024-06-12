import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import BuyCourse from "../BuyCourse/BuyCourse";
import UpcomingClass from "../Classes/UpcomingClass";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import RecorededClass from "../Classes/RecorededClass";

const tabs = [
  { name: "Upcoming" },
  { name: "Available Slot" },
  { name: "Recoded Class" },
];

const DoubtSolving = ({ selectedDateRange }) => {
  const navigate = useNavigate();
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [uuid, setUuid] = useState([]);
  const { studentId, solvingClassBook, count } = useLocation()?.state || {};
  const [doubtSolvingClass, setDoubtSolvingClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const { one_to_one_doubt_solving_count } = count;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEnrollNow = async (Id) => {
    const data = JSON.stringify({
      live_class_id: Id,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        `/enroll-students-in-live-class/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Slot Booked Successfully");
        navigate("/studentLiveClasses");
      } else if (response.status === 400) {
        toast.error(response?.data?.Message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const bookCount = async (Id) => {
    try {
      const response = await ajaxCall(
        `/add-bookslot/${Id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
        },
        8000
      );
      if (response.status === 200) {
        handleEnrollNow(Id);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const oToclass = [];
        const uuidData = [];
        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
          const response = await ajaxCall(
            `/liveclass_listwithid_view/${batchId}/`,
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
            setIsLoading(false);
            const oToclassData = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "One-To-One-Doubt-Solving"
            );
            const id = response?.data.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            oToclass.push(...oToclassData);
          } else {
            console.log("error");
          }
        }
        setUuid(uuidData);
        setDoubtSolvingClass(oToclass);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const doubtSolvingClasses = () => {
    return doubtSolvingClass?.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
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

  const oneToOneDoubtSolvingClasses = doubtSolvingClasses()?.filter((item) => {
    return solvingClassBook?.some((index) => index.id === item.id);
  });

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const oToclasses = doubtSolvingClasses()?.filter(
    (item) => !bookClass?.includes(item?.id)
  );

  return (
    <div>
      {one_to_one_doubt_solving_count === "" ? (
        <BuyCourse message="No One To One Doubt Solving Class Available , Please Buy a Course !!" />
      ) : (
        <div className="row">
          <Tab
            tabs={tabs}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
          <div className="tab-content tab__content__wrapper aos-init aos-animate">
            <div
              className={`tab-pane fade ${
                activeTab === "Upcoming" ? "show active" : ""
              }`}
            >
              <div className="row">
                <UpcomingClass
                  isLoading={isLoading}
                  classes={oneToOneDoubtSolvingClasses}
                  message="No Upcomming One To One Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Available Slot" ? "show active" : ""
              }`}
            >
              <div className="row">
                <ClassList
                  bookCount={bookCount}
                  isLoading={isLoading}
                  classes={oToclasses}
                  message=" No One To One Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Recoded Class" ? "show active" : ""
              }`}
            >
              <div className="row">
                <RecorededClass
                  uuid={uuid}
                  classes={oneToOneDoubtSolvingClasses}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtSolving;
