import React from "react";
import AdditionalResources from "./AdditionalResources";
import Material from "./Material";
import { useParams } from "react-router-dom";
import DSSidebar from "../../DSSideBar/DSSideBar";
import Tab from "../../../../UI/Tab";

const tabs = [{ name: "Downloads" }];

const CourseContent = () => {
  const { courseId } = useParams();
  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="row">
                      <Tab tabs={tabs} activeTab="Downloads" />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <div
                          className="tab-pane fade active show d-flex flex-wrap gap-4 align-items-center"
                          role="tabpanel"
                          aria-labelledby="projects__one"
                        >
                          <Material courseId={courseId} />
                          <AdditionalResources courseId={courseId} />
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
  );
};

export default CourseContent;
