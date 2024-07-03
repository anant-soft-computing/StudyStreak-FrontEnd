import React, { useEffect, useState } from "react";
import bookSpeakingSlot from "../../../../img/icon/assignment.svg";
import practice from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import regularClass from "../../../../img/icon/liveClass.svg";
import counselling from "../../../../img/icon/users.svg";
import progress from "../../../../img/icon/progress.svg";
import webinar from "../../../../img/icon/webinar.svg";
import support from "../../../../img/icon/support.svg";
import recordedClasses from "../../../../img/icon/gamification.svg";
import { Link } from "react-router-dom";
import UpcomingLiveClass from "./UpCommingLiveClass/UpCommingLiveClass";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import NextLesson from "./NextLesson/NextLesson";
import SpeakingSlots from "./SpeakingSlots/SpeakingSlots";
import ajaxCall from "../../../../helpers/ajaxCall";

const cardList = [
  {
    name: "Book Speaking Slot",
    icon: bookSpeakingSlot,
    link: "/studentLiveClasses",
  },
  { name: "Practice Test", icon: practice, link: "/practiceTest" },
  { name: "Full Length Test", icon: fullLengthTest, link: "/fullLengthTest" },
  { name: "Counselling", icon: counselling, link: "/studentLiveClasses" },
  { name: "Regular Classes", icon: regularClass, link: "/studentLiveClasses" },
  { name: "Tutor Support", icon: counselling, link: "/studentLiveClasses" },
  { name: "Webinar", icon: webinar, link: "/studentLiveClasses" },
  { name: "Progress", icon: progress },
  { name: "Software Support", icon: support },
];

const ScoreCard = ({ title, score }) => (
  <div className="col-xl-6 column__custom__class">
    <div className="gridarea__wraper card-background">
      <div className="gridarea__content">
        <div className="gridarea__heading">
          <h6>{title}</h6>
        </div>
        <div className="gridarea__price d-flex gap-2 mb-0">
          <h2>{score}</h2>
        </div>
        <div className="gridarea__bottom">
          <div className="gridarea__small__content">
            <Link to="">
              <h6>View Full Report {">>"}</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Card = ({ name, icon, link }) => {
  return (
    <div className="col-xl-4 column__custom__class">
      <div className="gridarea__wraper text-center card-background">
        <div
          className="gridarea__content p-2 m-2"
          style={{ cursor: link ? "pointer" : "default" }}
        >
          {link ? (
            <Link to={link} className="text-decoration-none">
              <div className="gridarea__heading">
                <img src={icon} alt={name} height={50} width={50} />
                <h3 className="mt-2">{name}</h3>
              </div>
            </Link>
          ) : (
            <div className="gridarea__heading">
              <img src={icon} alt={name} height={50} width={50} />
              <h3 className="mt-2">{name}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MiniTestCard = () => (
  <div className="col-xl-12 column__custom__class">
    <div className="gridarea__wraper text-center card-background">
      <div className="gridarea__content p-2 m-2">
        <Link to="/studentLiveClasses" className="text-decoration-none">
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
);

const SDashboard = () => {
  const [upcommingClass, setUpcommingClass] = useState([]);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));

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
          setUpcommingClass(
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

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                <div className="blog__details__content__wraper">
                  <div className="course__details__heading">
                    <h3>Welcome, {userData?.username}</h3>
                  </div>
                  <div className="online__course__wrap mt-0">
                    <div className="row instructor__slider__active row__custom__class">
                      <ScoreCard
                        title="Your Latest Mini Test Band Score"
                        score="Speaking 6.5"
                      />
                      <ScoreCard
                        title="Your Latest Full Length Test Band Score"
                        score="Overall 7.0"
                      />
                    </div>
                  </div>
                  <div className="row">
                    {cardList.map(({ name, icon, link }) => (
                      <Card key={name} name={name} icon={icon} link={link} />
                    ))}
                    <MiniTestCard />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <NoticeBoard />
                <UpcomingLiveClass upcommingClass={upcommingClass} />
                <NextLesson />
                <SpeakingSlots speakingSlots={upcommingClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
