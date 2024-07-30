import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import bookSpeakingSlot from "../../../../img/icon/assignment.svg";
import practice from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import regularClass from "../../../../img/icon/liveClass.svg";
import counselling from "../../../../img/icon/users.svg";
import progress from "../../../../img/icon/progress.svg";
import webinar from "../../../../img/icon/webinar.svg";
import support from "../../../../img/icon/support.svg";
import recordedClasses from "../../../../img/icon/gamification.svg";
import Loading from "../../../UI/Loading";
import UpcomingLiveClass from "./UpCommingLiveClass/UpCommingLiveClass";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SpeakingSlots from "./SpeakingSlots/SpeakingSlots";
import ajaxCall from "../../../../helpers/ajaxCall";
import ScoreCard from "./ScoreCard/ScoreCard";
import DSSidebar from "../DSSideBar/DSSideBar";
import UnPaidDashboard from "../UnPaidDashboard/UnPaidDashboard";
import NextLesson from "./NextLesson/NextLesson";

const cardList = [
  {
    name: "Book Speaking Slot",
    icon: bookSpeakingSlot,
    link: "/studentLiveClasses",
    state: { activeTab: "Speaking Practice" },
  },
  { name: "Practice Test", icon: practice, link: "/practiceTest" },
  { name: "Full Length Test", icon: fullLengthTest, link: "/fullLengthTest" },
  {
    name: "Counselling",
    icon: counselling,
    link: "/studentLiveClasses",
    state: { activeTab: "Counselling" },
  },
  {
    name: "Regular Classes",
    icon: regularClass,
    link: "/studentLiveClasses",
  },
  {
    name: "Tutor Support",
    icon: counselling,
    link: "/studentLiveClasses",
    state: { activeTab: "Tutor Support" },
  },
  {
    name: "Webinar",
    icon: webinar,
    link: "/studentLiveClasses",
    state: { activeTab: "Webinar" },
  },
  { name: "Progress", icon: progress },
  { name: "Resources", icon: support, link: "/resources" },
];

const SDashboard = () => {
  const [count, setCount] = useState(0);
  const [studentID, setStudentID] = useState(0);
  const [batchData, setBatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [upcomingSS, setUpcomingSS] = useState([]);
  const [upcommingClass, setUpcommingClass] = useState([]);
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON.parse(localStorage.getItem("courses"));
  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  const studentBatch = batchData?.filter((item) =>
    batchIds?.includes(item?.id)
  );

  const courses = courseList.filter((item) =>
    courseIds?.some((data) => data?.id === item?.id)
  );

  const getDaysRemaining = (endDate) => {
    const end = moment(endDate);
    const today = moment();
    return end.diff(today, "days");
  };

  const fetchData = async (url, dataes) => {
    try {
      const response = await ajaxCall(
        url,
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
        dataes(response?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData("/batchview/", setBatchData),
        fetchData("/courselistview/", setCourseList),
        fetchData("/userwisepackagewithcourseid/", (data) => {
          setCount(data?.batch_package_count);
          setStudentID(data?.student_packages[0]?.student_id);
        }),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchBatchData = async () => {
      setIsLoading(true);
      try {
        const regularClassData = [];
        const speakingClassData = [];
        for (let i = 0; i < batchIds?.length; i++) {
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
            regularClassData.push(
              ...response?.data?.filter(
                (item) => item?.liveclasstype?.name === "Regular Class"
              )
            );
            speakingClassData.push(
              ...response?.data?.filter(
                (item) => item?.liveclasstype?.name === "Speaking-Practice"
              )
            );
          } else {
            console.log("error");
          }
        }
        setUpcomingSS(speakingClassData);
        setUpcommingClass(regularClassData);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchData();
  }, []);

  if (isLoading) {
    return <Loading text="Loading..." color="primary" />;
  }

  return (
    <>
      {count !== 0 ? (
        <div className="body__wrapper">
          <div className="main_wrapper overflow-hidden">
            <div className="dashboardarea sp_bottom_100">
              <div className="dashboard">
                <div className="container-fluid full__width__padding">
                  <div className="row">
                    <DSSidebar />
                    <div className="col-xl-8 col-lg-8">
                      <div className="blog__details__content__wraper">
                        <div className="course__details__heading">
                          <h3>Welcome, {userData?.username}</h3>
                        </div>
                        <h5>
                          Batch :{" "}
                          {studentBatch.map((batch) => (
                            <span key={batch.id}>
                              {batch.batch_name} :{" "}
                              {moment(
                                batch.batch_start_timing,
                                "HH:mm:ss"
                              ).format("hh:mm A")}{" "}
                              |{" "}
                            </span>
                          ))}
                        </h5>
                        <div className="online__course__wrap mt-0">
                          <div className="row instructor__slider__active row__custom__class">
                            <ScoreCard />
                          </div>
                        </div>
                        <div className="row">
                          {cardList.map(
                            ({ name, icon, link, state }, index) => (
                              <div
                                key={index}
                                className="col-xl-4 column__custom__class"
                              >
                                <div className="gridarea__wraper text-center card-background">
                                  <div
                                    className="gridarea__content p-2 m-2"
                                    style={{
                                      cursor: link ? "pointer" : "default",
                                    }}
                                  >
                                    {link ? (
                                      <Link
                                        to={link}
                                        className="text-decoration-none"
                                        state={state}
                                      >
                                        <div className="gridarea__heading">
                                          <img
                                            src={icon}
                                            alt={name}
                                            height={50}
                                            width={50}
                                          />
                                          <h3 className="mt-2">{name}</h3>
                                        </div>
                                      </Link>
                                    ) : (
                                      <div className="gridarea__heading">
                                        <img
                                          src={icon}
                                          alt={name}
                                          height={50}
                                          width={50}
                                        />
                                        <h3 className="mt-2">{name}</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <div className="col-xl-12 column__custom__class">
                            <div className="gridarea__wraper text-center card-background">
                              <div className="gridarea__content p-2 m-2">
                                <Link
                                  to="/studentLiveClasses"
                                  className="text-decoration-none"
                                  state={{ activeTab: "Recorded Class" }}
                                >
                                  <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                    <img
                                      src={recordedClasses}
                                      alt="Recorded Classes"
                                      height={35}
                                      width={35}
                                    />
                                    <h2 className="mt-2">Recorded Classes</h2>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4">
                      <h5>
                        Course :
                        {courses?.length > 0 &&
                          courses.map((course) => {
                            const daysRemaining = getDaysRemaining(
                              course.EnrollmentEndDate
                            );
                            return (
                              <span key={course?.id} className="text-danger">
                                {" "}
                                {course.Course_Title} : {daysRemaining} days
                                Left |
                              </span>
                            );
                          })}
                      </h5>
                      <LeaderBoard studentID={studentID} />
                      <UpcomingLiveClass upcommingClass={upcommingClass} />
                      <NextLesson />
                      <SpeakingSlots upcomingSS={upcomingSS} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UnPaidDashboard />
      )}
    </>
  );
};

export default SDashboard;
