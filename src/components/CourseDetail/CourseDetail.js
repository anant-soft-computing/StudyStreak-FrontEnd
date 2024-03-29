import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import PackageDetails from "./PackageDetails";
import Content from "./Content/Content";
import DetailCard from "./Content/DetailCard";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { checkAuth } = useCheckAuth();
  const authData = useSelector((state) => state.authStore);

  const [courseDetail, setCouresDetail] = useState();
  const [coursePackages, setCoursePackages] = useState();
  const [showBatchSelection, setShowBatchSelection] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [authData]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/courseretupddelview/${courseId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "PATCH",
          },
          8000
        );
        if (response.status === 200) {
          const section = [];
          response.data?.lessons?.map((lesson) => {
            const isSessionExist = section.find(
              (item) => item.id === lesson?.section.id
            );
            if (!isSessionExist) {
              section.push(lesson?.section);
            }
          });
          const updatedData = {
            ...response.data,
            section,
          };
          section.map((sectionItem) => {
            const lessons = response.data?.lessons?.filter(
              (lesson) => lesson?.section.id === sectionItem.id
            );
            sectionItem.lessons = lessons;
          });

          setCouresDetail(updatedData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/course/${courseId}/packages/`,
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
          setCoursePackages(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="blogarae__img__2 course__details__img__2">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6">
                      <img src={courseDetail?.Course_Thumbnail} alt="blog" />
                    </div>
                    <DetailCard courseDetail={courseDetail} />
                  </div>
                </div>
                <div className="blog__details__content__wraper">
                  <div className="course__button__wraper">
                    <div className="course__button">
                      {courseDetail?.Category?.name && (
                        <Link to="">{courseDetail?.Category?.name}</Link>
                      )}
                    </div>
                    <div className="course__date">
                      <div className="course__details__date">
                        <i className="icofont-book-alt"></i>{" "}
                        {courseDetail?.lessons?.length} Lessons
                      </div>
                    </div>
                  </div>
                  <div className="course__details__heading">
                    <h3>{courseDetail?.Course_Title}</h3>
                  </div>
                  <div className="course__details__paragraph">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: courseDetail?.Short_Description,
                      }}
                    ></div>
                  </div>
                  <h4 className="sidebar__title">Packages</h4>
                  <div className="mb-4">
                    {coursePackages?.packages?.length >= 1 ? (
                      <PackageDetails
                        showBatchSelection={showBatchSelection}
                        setShowBatchSelection={setShowBatchSelection}
                        packages={coursePackages?.packages}
                        courseId={courseId}
                        courseName={courseDetail?.Course_Title}
                        courseType={courseDetail?.course_delivery}
                      />
                    ) : (
                      <div>
                        <h5 className="text-danger sp_20 col--30">
                          No Packages Available For This Course !!
                        </h5>
                      </div>
                    )}
                  </div>
                  <Content courseDetail={courseDetail} />
                  <div className="course__list__wraper">
                    <div className="blog__details__heading__2">
                      <h5>Why course is important ?</h5>
                    </div>
                    <div className="aboutarea__list__2 blog__details__list__2">
                      <ul className="ps-0">
                        <li>
                          <div
                            className="faqs"
                            dangerouslySetInnerHTML={{
                              __html: courseDetail?.faqs,
                            }}
                          ></div>
                        </li>
                      </ul>
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

export default CourseDetail;
