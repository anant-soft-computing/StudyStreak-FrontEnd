import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import bookSpeakingSlot from "../../../../img/icon/assignment.svg";
import practice from "../../../../img/icon/practiceTest.svg";
import regularClass from "../../../../img/icon/liveClass.svg";
import counselling from "../../../../img/icon/users.svg";
import progress from "../../../../img/icon/progress.svg";
import webinar from "../../../../img/icon/webinar.svg";
import support from "../../../../img/icon/support.svg";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import UnPaidClasses from "./UnPaidClasses/UnPaidClasses";

const tableData = [
  {
    id: 1,
    name: "Anand Shemrudkar ",
    score: "4.5",
  },
  {
    id: 2,
    name: "Shivani Patel",
    score: "4.0",
  },
  {
    id: 3,
    name: "Deep Thakkar",
    score: "5.0",
  },
  {
    id: 4,
    name: "Abhi Patel",
    score: "4.0",
  },
];

const cardList = [
  { name: "Book Speaking Slot", icon: bookSpeakingSlot },
  { name: "Practice Test", icon: practice },
  { name: "Full Length Test", icon: fullLengthTest },
  { name: "Counselling", icon: counselling },
  { name: "Regular Classes", icon: regularClass },
  { name: "Tutor Support", icon: counselling },
  { name: "Webinar", icon: webinar },
  { name: "Progress", icon: progress },
  { name: "Software Support", icon: support },
];

const UnPaidDashboard = () => {
  const navigate = useNavigate();

  const [demoClass, setDemoClass] = useState([]);
  const [counselling, setCounselling] = useState([]);
  const [masterClass, setMasterClass] = useState([]);

  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await ajaxCall(
          "/liveclass_list_view/",
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
          const classes = response?.data;
          setMasterClass(
            classes.filter(({ liveclasstype }) => liveclasstype === "Master")
          );
          setCounselling(
            classes.filter(
              ({ liveclasstype, meeting_title }) =>
                liveclasstype === "Counselling" &&
                meeting_title.startsWith("Introduction")
            )
          );
          setDemoClass(
            classes.filter(({ liveclasstype }) => liveclasstype === "Demo")
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <DSSidebar />
              <div className="col-xl-7 col-lg-7">
                <div className="blog__details__content__wraper">
                  <div className="course__details__heading">
                    <h3>Welcome, {userData?.username}</h3>
                  </div>
                  <div className="relative-container ">
                    <div className="row p-3">
                      {cardList.map(({ name, icon, link }, index) => (
                        <div
                          key={index}
                          className="col-xl-4 column__custom__class"
                        >
                          <div className="gridarea__wraper text-center card-background">
                            <div
                              className="gridarea__content p-2 m-2"
                              style={{ cursor: link ? "pointer" : "default" }}
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="overlay-container d-flex flex-column justify-content-center">
                      <div className="col-xl-12 d-flex justify-content-center align-items-center">
                        <div
                          className="gridarea__wraper text-center card-background"
                          style={{ width: "1000px" }}
                        >
                          <div
                            className="gridarea__content p-4 m-2"
                            onClick={() => navigate("/freeMiniTest")}
                          >
                            <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                              <img
                                src={fullLengthTest}
                                alt="Recorded Classes"
                                height={35}
                                width={35}
                              />
                              <Link className="text-decoration-none">
                                <h2 className="mt-2">Free Mini Test</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 d-flex justify-content-center align-items-center">
                        <div
                          className="gridarea__wraper text-center card-background"
                          style={{ width: "1000px" }}
                        >
                          <div
                            className="gridarea__content p-4 m-2"
                            onClick={() => navigate("/freeDiagnosticTest")}
                          >
                            <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                              <img
                                src={practiceTest}
                                alt="Recorded Classes"
                                height={35}
                                width={35}
                              />
                              <Link className="text-decoration-none">
                                <h2 className="mt-2">Free Diagnostic Test</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 d-flex justify-content-center align-items-center">
                        <div className="gridarea__wraper text-center card-background">
                          <div className="gridarea__content p-2 m-2">
                            <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                              <h3 className="mt-2">
                                You Have Not purchased Any Package. <br />
                                Click below to view available plans
                              </h3>
                            </div>
                            <button
                              className="default__button"
                              onClick={() => navigate("/courses")}
                            >
                              View Plans
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5">
                <div className="dashboard__inner card-background">
                  <div className="dashboard__nav__title">
                    <h6>Our Instructors</h6>
                  </div>
                  <hr />
                  <div className="dashboard__table table-responsive">
                    <table>
                      <tbody>
                        {tableData.map(({ id, name, score }, index) => (
                          <tr
                            key={id}
                            className={
                              index % 2 === 0 ? "" : "dashboard__table__row"
                            }
                          >
                            <td>{id}.</td>
                            <td>{name}</td>
                            <td>{score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <UnPaidClasses
                  classData={demoClass}
                  title="Free Demo Class"
                  message="No Demo Class Available !!"
                />
                <UnPaidClasses
                  classData={masterClass}
                  title="Free Master Class"
                  message="No MasterClass Available !!"
                />
                <UnPaidClasses
                  classData={counselling}
                  title="Free Counselling Class"
                  message="No Counselling Available !!"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnPaidDashboard;
