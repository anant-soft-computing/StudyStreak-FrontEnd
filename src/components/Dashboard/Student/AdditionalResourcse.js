import React, { useEffect, useState } from "react";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import DSNavBar from "./DSNavBar/DSNavBar";
import DSSidebar from "./DSSideBar/DSSideBar";
import Footer from "../../Footer/Footer";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";

const AdditionalResourcse = () => {
  const { enrolledCourse } = useLocation().state;
  const [additionalResource, setAdditionalResource] = useState([]);

  const getAdditionalResource = async () => {
    try {
      const response = await ajaxCall(
        `/additional-resources/${enrolledCourse?.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setAdditionalResource(response?.data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getAdditionalResource();
  }, [enrolledCourse?.id]);

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div>
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
          </div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Additional Resources</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {additionalResource.map((item) => (
                                  <tr key={item.id}>
                                    <th>
                                    <span>{item.info}</span>
                                      <p className="mt-2">
                                        Course :{" "}
                                        <span>
                                          {enrolledCourse?.Course_Title}
                                        </span>
                                      </p>
                                    </th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <div className="dashboard__button__group">
                                        <a
                                          className="dashboard__small__btn__2"
                                          href={item.course_files}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <i className="icofont-download" />
                                          Download
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
      <Footer />
    </>
  );
};

export default AdditionalResourcse;
