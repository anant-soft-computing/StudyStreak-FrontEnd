import React from "react";
import lessons from "../../../../img/icon/assignment.svg";
import practice from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import counselling from "../../../../img/icon/users.svg";
import progress from "../../../../img/icon/progress.svg";
import webinar from "../../../../img/icon/webinar.svg";
import support from "../../../../img/icon/support.svg";
import freeMiniTest from "../../../../img/icon/gamification.svg";
import { Link } from "react-router-dom";

const cardList = [
  { name: "Lessons", icon: lessons },
  { name: "Practice Test", icon: practice, link: "/practiceTest" },
  { name: "Full Length Test", icon: fullLengthTest, link: "/fullLengthTest" },
  { name: "Counselling", icon: counselling },
  { name: "Live Class", icon: liveClass, link: "/studentLiveClasses" },
  { name: "Tutor Support", icon: counselling },
  { name: "Webinar", icon: webinar },
  { name: "Progress", icon: progress },
  { name: "Software Support", icon: support },
];

const tableData = [
  {
    id: 1,
    name: "Amish Patel",
    score: "1240 pts",
  },
  {
    id: 2,
    name: "Rohini Chaudhary",
    score: "1100 pts",
  },
  {
    id: 3,
    name: "Sweety Gill",
    score: "879 pts",
  },

  {
    id: 4,
    name: "Amiraj Solanki",
    score: "800 pts",
  },
  {
    id: 5,
    name: "Krina Patel",
    score: "432 pts",
  },
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
        <Link to="/mockTest" className="text-decoration-none">
          <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
            <img
              src={freeMiniTest}
              alt="Free Mini Test"
              height={35}
              width={35}
            />
            <h2 className="mt-2">Free Mini Test</h2>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

const Leaderboard = () => (
  <div className="dashboard__inner card-background">
    <div className="dashboard__nav__title">
      <h6>Leaderboard</h6>
    </div>
    <hr />
    <div className="dashboard__table table-responsive">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ id, name, score }, index) => (
            <tr
              key={id}
              className={index % 2 === 0 ? "" : "dashboard__table__row"}
            >
              <th>{id}</th>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UpcomingLiveClass = () => (
  <div className="dashboard__inner mt-4 card-background">
    <div className="dashboard__nav__title">
      <h6>Upcoming Live Class</h6>
    </div>
    <hr />
    <div>Writing Task 1 - Letter Writing</div>
    <div>Tomorrow, 06:00 PM</div>
  </div>
);

const NextLesson = () => (
  <div className="dashboard__inner mt-4 card-background">
    <div className="dashboard__nav__title">
      <h6>Next Lesson Due</h6>
    </div>
    <hr />
    <div>Writing Task 2 - Essay Writing</div>
    <div className="d-flex justify-content-between align-items-center">
      <div>Lesson No. 7</div>
      <Link to="" className="text-decoration-none">
        <div>View Lesson {">>"}</div>
      </Link>
    </div>
  </div>
);

const SpeakingSlots = () => (
  <div className="dashboard__inner mt-4 card-background">
    <div className="dashboard__nav__title">
      <h6>Speaking Slots</h6>
    </div>
    <hr />
    <div>Speaking Part II with Anand Sir</div>
    <div className="d-flex justify-content-between align-items-center">
      <div>May 24, 7:00 pm</div>
      <Link to="" className="text-decoration-none">
        <div>View all slots {">>"}</div>
      </Link>
    </div>
  </div>
);

const SDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
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
                        title="Your Latest Practice Band Score"
                        score="Speaking 6.5"
                      />
                      <ScoreCard
                        title="Your Latest Full Mock Band Score"
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
                <Leaderboard />
                <UpcomingLiveClass />
                <NextLesson />
                <SpeakingSlots />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
