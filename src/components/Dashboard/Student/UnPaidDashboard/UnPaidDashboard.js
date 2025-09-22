import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import UnPaidClasses from "./UnPaidClasses/UnPaidClasses";
import {
  ChartNoAxesColumnIncreasing,
  Film,
  PcCase,
  Pencil,
  Settings,
  Speaker,
  Users,
  Videotape,
} from "lucide-react";

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
  { name: "Book Speaking Slot", icon: <Speaker width={35} height={35} /> },
  { name: "Practice Test", icon: <Pencil width={35} height={35} /> },
  { name: "Full Length Test", icon: <PcCase width={35} height={35} /> },
  { name: "Counselling", icon: <Users width={35} height={35} /> },
  { name: "Regular Classes", icon: <Videotape width={35} height={35} /> },
  { name: "Tutor Support", icon: <Users width={35} height={35} /> },
  { name: "Webinar", icon: <Film width={35} height={35} /> },
  {
    name: "Progress",
    icon: <ChartNoAxesColumnIncreasing width={35} height={35} />,
  },
  { name: "Software Support", icon: <Settings width={35} height={35} /> },
];

const UnPaidDashboard = ({
  daysRemaining,
  selectedCourse,
  studentCourses,
  handleCourse,
}) => {
  const navigate = useNavigate();

  const [demoClass, setDemoClass] = useState([]);
  const [counselling, setCounselling] = useState([]);
  const [masterClass, setMasterClass] = useState([]);

  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  const useFetchClasses = (liveClassType, setClassData) => {
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await ajaxCall(
            `/liveclass_list_view/?live_class_type=${liveClassType}&is_public=1`,
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
            setClassData(response?.data);
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchClasses();
    }, [liveClassType, setClassData]);
  };

  useFetchClasses("Demo", setDemoClass);
  useFetchClasses("Master", setMasterClass);
  useFetchClasses("Counselling", setCounselling);

  return (
    <div className='body__wrapper'>
      <div className='main_wrapper overflow-hidden'>
        <div className='blogarea__2 sp_top_100 sp_bottom_100'>
          <div className='container'>
            <div className='row'>
              <DSSidebar />
              <div className='col-xl-7 col-lg-7'>
                <div className='blog__details__content__wraper'>
                  <div className='course__details__heading'>
                    <h3>Welcome, {userData?.username}</h3>
                  </div>
                  <div className='relative-container '>
                    <div className='row p-3'>
                      {cardList.map(({ name, icon, link }, index) => (
                        <div
                          key={index}
                          className='col-xl-4 column__custom__class'
                        >
                          <div className='gridarea__wraper text-center card-background'>
                            <div
                              className='gridarea__content p-2 m-2'
                              style={{ cursor: link ? "pointer" : "default" }}
                            >
                              <div className='gridarea__heading'>
                                <img
                                  src={icon}
                                  alt={name}
                                  height={50}
                                  width={50}
                                />
                                <h3 className='mt-2'>{name}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='overlay-container d-flex flex-column justify-content-center'>
                      <div className='col-xl-12 d-flex justify-content-center align-items-center'>
                        <div
                          className='gridarea__wraper text-center card-background'
                          style={{ width: "1000px" }}
                        >
                          <div
                            className='gridarea__content p-4 m-2'
                            onClick={() => navigate("/freeMiniTest")}
                          >
                            <div className='gridarea__heading d-flex justify-content-center align-items-center gap-4'>
                              <Pencil width={35} height={35} />
                              <Link className='text-decoration-none'>
                                <h2 className='mt-2'>Free Mini Test</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-12 d-flex justify-content-center align-items-center'>
                        <div
                          className='gridarea__wraper text-center card-background'
                          style={{ width: "1000px" }}
                        >
                          <div
                            className='gridarea__content p-4 m-2'
                            onClick={() => navigate("/freeDiagnosticTest")}
                          >
                            <div className='gridarea__heading d-flex justify-content-center align-items-center gap-4'>
                              <PcCase width={35} height={35} />
                              <Link className='text-decoration-none'>
                                <h2 className='mt-2'>Free Diagnostic Test</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-12 d-flex justify-content-center align-items-center'>
                        <div className='gridarea__wraper text-center card-background'>
                          <div className='gridarea__content p-2 m-2'>
                            <div className='gridarea__heading d-flex justify-content-center align-items-center gap-4'>
                              <h3 className='mt-2'>
                                You Have Not purchased Any Package. <br />
                                Click below to view available plans
                              </h3>
                            </div>
                            <button
                              className='default__button'
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
              <div className='col-xl-5 col-lg-5'>
                {studentCourses?.length > 0 && (
                  <div className='dashboard__form__wraper mb-3'>
                    <div className='dashboard__form__input'>
                      <div className='dashboard__form__input d-flex align-items-center justify-content-between mb-2'>
                        <h5 className='mb-0'>Course</h5>
                        <div className='d-flex align-items-center gap-2 justify-content-center'>
                          <h5 className='text-danger mb-0'>Expired</h5>
                        </div>
                      </div>
                      <select
                        className='form-select'
                        aria-label='Select a course'
                        value={JSON.stringify(selectedCourse)}
                        onChange={(e) =>
                          handleCourse(JSON.parse(e.target.value))
                        }
                      >
                        {studentCourses?.map((item) => (
                          <option
                            key={item.course_id}
                            value={JSON.stringify(item)}
                          >
                            {item.course_category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className='dashboard__inner card-background'>
                  <div className='dashboard__nav__title'>
                    <h6>Our Instructors</h6>
                  </div>
                  <hr />
                  <div className='dashboard__table table-responsive'>
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
                  title='Free Demo Class'
                  message='No Demo Class Available !!'
                />
                <UnPaidClasses
                  classData={masterClass}
                  title='Free Master Class'
                  message='No MasterClass Available !!'
                />
                <UnPaidClasses
                  classData={counselling}
                  title='Free Counselling Class'
                  message='No Counselling Available !!'
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
