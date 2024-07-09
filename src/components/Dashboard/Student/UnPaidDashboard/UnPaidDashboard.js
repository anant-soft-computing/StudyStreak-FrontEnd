import React from "react";
import { Link, useNavigate } from "react-router-dom";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import DSSidebar from "../DSSideBar/DSSideBar";

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

const UnPaidDashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <DSSidebar />
              <div className="col-xl-8 col-lg-8">
                <div className="blog__details__content__wraper">
                  <div className="course__details__heading">
                    <h3>Welcome, {userData?.username}</h3>
                  </div>
                  <div className="col-xl-12 d-flex justify-content-center align-items-center">
                    <div className="gridarea__wraper text-center card-background transparent-background">
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
                  <div className="col-xl-12 d-flex justify-content-center align-items-center">
                    <div className="gridarea__wraper text-center card-background transparent-background">
                      <div className="gridarea__content p-2 m-2">
                        <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                          <img
                            src={practiceTest}
                            alt="Recorded Classes"
                            height={35}
                            width={35}
                          />
                          <h5 className="mt-2">
                            Take A free Diagnostic Test <br />
                            With This Test,You can Determine Which Kind of
                            Course and Package and You need for your Preparation
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 d-flex justify-content-center align-items-center">
                    <div
                      className="gridarea__wraper text-center card-background transparent-background"
                      style={{ width: "1000px" }}
                    >
                      <div className="gridarea__content p-4 m-2">
                        <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                          <img
                            src={fullLengthTest}
                            alt="Recorded Classes"
                            height={35}
                            width={35}
                          />
                          <h2 className="mt-2">Free Mini Test</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
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
                <div className="dashboard__inner mt-4 card-background">
                  <div className="dashboard__nav__title">
                    <h6>Join an IELTS Masterclass</h6>
                  </div>
                  <hr />
                  <div>Get 8.0 band in 2 Hours - attend th..</div>
                  <div>Tommorow, 6:00 PM</div>
                </div>
                <div className="dashboard__inner mt-4 card-background">
                  <div className="dashboard__nav__title">
                    <h6>IELTS Orientation</h6>
                  </div>
                  <hr />
                  <div>Start your IELTS journey with basics</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Reading</div>
                    <Link to="" className="text-decoration-none">
                      <div>Join now {">>"}</div>
                    </Link>
                  </div>
                </div>
                <div className="dashboard__inner mt-4 card-background">
                  <div className="dashboard__nav__title">
                    <h6>Free Demo Class</h6>
                  </div>
                  <hr />
                  <div>Writing Part 1 - Demo Class</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>May 24, 7:00 PM</div>
                    <Link className="text-decoration-none">
                      <div>View all demos {">>"}</div>
                    </Link>
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

export default UnPaidDashboard;
