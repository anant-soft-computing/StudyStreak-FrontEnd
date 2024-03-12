import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";

const DSSidebar = () => {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [solvingClassBook, setSolvingClassBook] = useState([]);
  const [batchId, setBatchId] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const [count, setCount] = useState({});
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();

  const menuList = [
    {
      name: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      link: "/studentDashboard/",
    },
    {
      name: "My Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-user"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      link: "/studentProfile",
    },
    {
      name: "My Course",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-courses"
        >
          <rect x="2" y="10" width="6" height="8"></rect>
          <rect x="16" y="10" width="6" height="8"></rect>

          <circle cx="6" cy="5" r="2"></circle>
          <circle cx="12" cy="5" r="2"></circle>
          <circle cx="18" cy="5" r="2"></circle>
        </svg>
      ),
      link: "/studentMyCourse",
      state: { enrolledCourse: enrolledCourse },
    },
    {
      name: "Assignment",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      link: "/mockTest",
    },
    {
      name: "Practice Test",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      link: "/practiceTest",
    },
    {
      name: "Full Length Test",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      link: "/fullLengthTest",
    },
    {
      name: "Live Classes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-live-classes"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          <polygon points="10 15 15 12 10 9 10 15"></polygon>
        </svg>
      ),
      link: "/studentLiveClasses",
      state: { batchId: batchId },
    },
    {
      name: "Speaking Practice",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-shopping-bag"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      link: "/speakingSolving",
      state: { studentId: studentId, solvingClassBook: solvingClassBook[0] },
    },
    {
      name: "Group Doubt Solving",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-shopping-bag"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      link: "/groupDoubtSolving",
      state: { studentId: studentId, solvingClassBook: solvingClassBook[0] },
    },
    {
      name: "One To One Doubt Solving",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-bookmark"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      link: "/doubtSolving",
      state: { studentId: studentId, solvingClassBook: solvingClassBook[0] },
    },
    {
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-bookmark"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33
          H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2
          2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2
          2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0
          0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0
          1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51
          1z"
          ></path>
        </svg>
      ),
      link: "/studentSettings",
    },
    {
      name: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-volume-1"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      ),
      link: "/login",
    },
  ];

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
          const studentMT = studentPackage?.student_mock;
          const studentPT = studentPackage?.student_pt;
          const studentFLT = studentPackage?.student_flt;
          const studentSP = studentPackage?.Live_class_enroll?.filter(
            ({ liveclasstype }) => liveclasstype.name === "Speaking-Practice"
          )?.length;
          const studentOTOS = studentPackage?.Live_class_enroll?.filter(
            ({ liveclasstype }) =>
              liveclasstype.name === "One-To-One-Doubt-Solving"
          )?.length;
          const studentGDS = studentPackage?.Live_class_enroll?.filter(
            ({ liveclasstype }) => liveclasstype.name === "Group-Doubt Solving"
          )?.length;

          setCount({
            practice_test_count:
              packageDetails?.practice_test_count - studentPT || "",
            mock_test_count:
              packageDetails?.practice_test_count - studentMT || "",
            full_length_test_count:
              packageDetails?.full_length_test_count - studentFLT || "",
            speaking_practice_count:
              packageDetails?.speaking_test_count - studentSP || "",
            group_doubt_solving_count:
              packageDetails?.group_doubt_solving_count - studentGDS || "",
            one_to_one_doubt_solving_count:
              packageDetails?.one_to_one_doubt_solving_count - studentOTOS ||
              "",
          });
          setBatchId(response?.data?.student_packages?.[0]?.batch_id);
          localStorage.setItem(
            "StudentID",
            response?.data?.student_packages?.[0]?.student_id
          );
          setStudentId(response?.data?.student_packages?.[0]?.student_id);
          setEnrolledCourse(
            response?.data?.student_packages?.map(({ course }) => course)
          );
          setSolvingClassBook(
            response?.data?.student_packages?.map(
              ({ Live_class_enroll }) => Live_class_enroll
            )
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-12">
        <div className="dashboard__inner sticky-top">
          <div className="dashboard__nav__title">
            <h6>Welcome, {userData?.username}</h6>
          </div>
          <div className="dashboard__nav">
            <ul>
              {menuList.map((item, index) => (
                <li key={index}>
                  <Link
                    className={location === item.link ? "active" : ""}
                    to={item.link}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    onClick={item.name === "Logout" ? logout : () => {}}
                    state={item?.state}
                  >
                    <div style={{ width: "10%" }}>{item.icon}</div>
                    <div style={{ width: "65%" }}>{item.name}</div>
                    {item.name === "Practice Test" ||
                    item.name === "Assignment" ||
                    item.name === "Full Length Test" ||
                    item.name === "Speaking Practice" ||
                    item.name === "Group Doubt Solving" ||
                    item.name === "One To One Doubt Solving" ? (
                      <span className="dashboard__label">
                        {
                          count[
                            item.name.replace(/ /g, "_").toLowerCase() +
                              "_count"
                          ]
                        }
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSSidebar;
