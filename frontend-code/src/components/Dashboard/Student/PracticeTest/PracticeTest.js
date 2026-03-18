import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tab from "../../../UI/Tab";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";
import PracticeTestTable from "./PracticeTestTable";
import PTAssessment from "../Assessment/PTAssessment/PTAssessment";

const PracticeTest = () => {
  const { count, packageCount } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
    General: [],
  });
  const [givenTest, setGivenTest] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("Reading");
  const [ieltsCategory, setIeltsCategory] = useState("");
  const category = JSON.parse(localStorage.getItem("course"))?.course_category;

  const tabs =
    category !== "GENERAL"
      ? [
          { name: "Reading" },
          { name: "Writing" },
          { name: "Listening" },
          { name: "Speaking" },
        ]
      : [{ name: "General" }];

  useEffect(() => {
    if (category !== "GENERAL") {
      setActiveTab("Reading");
    } else {
      setActiveTab("General");
    }
  }, [category]);

  useEffect(() => {
    if (category === "IELTS") {
      setIeltsCategory("Academic");
    } else {
      setIeltsCategory("");
    }
  }, [category]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/get-student-course/",
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
          const courses = response?.data
            ?.filter((item) => item.course_category === "GENERAL")
            .map((course) => {
              return course.course_name
                .split(" ")
                .map((word, index) =>
                  index === 0 ? word.substring(0, 2) : word[0]
                )
                .join("")
                .toUpperCase();
            });

          setStudentCourses(courses);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/student-stats/",
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
          setGivenTest(response?.data?.student_pt);
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [activeTab]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/ct/ielts/practice-tests/?exam_type=${activeTab}&category=${category}&sub_category=${ieltsCategory}`,
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
          const filteredData = {
            Reading: data,
            Writing: data,
            Listening: data,
            Speaking: data,
            General: data.filter(({ IELTS }) =>
              studentCourses?.some((item) => IELTS?.Name?.includes(item))
            ),
          };
          setTestData(filteredData);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab, category, ieltsCategory, studentCourses]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const givenTestOfType = (type) => {
    return testData[type].filter((item) => {
      return givenTest?.some((test) => {
        // Try multiple matching strategies for better compatibility
        return test?.id === item.id || 
               test === item.id ||
               test?.practice_test_id === item.id ||
               test?.paper_id === item.id ||
               (test?.IELTS && test.IELTS.id === item.id);
      });
    });
  };

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
                    <div className="dashboard__section__title">
                      <h4>
                        Practice Test {category && ` (Course: ${category})`}
                      </h4>
                      {category === "IELTS" && (
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>IELTS Type</label>
                            <select
                              className="form-select"
                              name="ieltsCategory"
                              value={ieltsCategory}
                              onChange={(e) => setIeltsCategory(e.target.value)}
                            >
                              <option value="Academic">Academic</option>
                              <option value="General">General</option>
                              <option value="Foundation">Foundation</option>
                              <option value="Grammar">Grammar</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    {packageCount === 0 ? (
                      <BuyCourse message="No Practice Test Available, Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          <PracticeTestTable
                            testData={testData[activeTab]}
                            givenTest={givenTestOfType(activeTab)}
                            testType={activeTab}
                            isLoading={isLoading}
                            pendingTest={count}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {(activeTab === "Writing" || activeTab === "Speaking") && (
                    <PTAssessment
                      testType={activeTab}
                      givenWritingTest={givenTestOfType("Writing")}
                      givenSpeakingTest={givenTestOfType("Speaking")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
