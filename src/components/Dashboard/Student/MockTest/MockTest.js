import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tab from "../../../UI/Tab";
import TestTable from "./TestTable";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";
import MTAssessment from "../Assessment/MTAssessment/MTAssessment";

const MockTest = () => {
  const { count } = useLocation().state || {};
  const [activeTab, setActiveTab] = useState("Reading");
  const [isLoading, setIsLoading] = useState(true);
  const [givenTest, setGivenTest] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [givenSpeakingTest, setGivenSpeakingTest] = useState([]);
  const [allMockTestData, setAllMockTestData] = useState([]);
  const [allSpeakingData, setAllSpeakingData] = useState([]);
  const [ieltsCategory, setIeltsCategory] = useState("Academic");
  const category = localStorage.getItem("category");

  const tabs =
    category !== "GENERAL"
      ? [
          { name: "Reading" },
          { name: "Writing" },
          { name: "Listening" },
          { name: "Speaking" },
        ]
      : [{ name: "General" }];

  const filterByIELTSCategory = (item, category) => {
    switch (category) {
      case "General":
        return item.name.includes("General");
      case "Foundation":
        return item.name.includes("Foundation");
      case "Grammar":
        return item.name.includes("Grammar");
      case "Academic":
        return (
          !item.name.includes("General") &&
          !item.name.includes("Foundation") &&
          !item.name.includes("Grammar")
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    if (category !== "GENERAL") {
      setActiveTab("Reading");
    } else {
      setActiveTab("General");
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
          setGivenTest(response?.data?.student_mock);
          setGivenSpeakingTest(response?.data?.student_speakingblock);
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "Speaking") {
          const speakingBlocksResponse = await ajaxCall(
            "/speaking-block/",
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
          if (speakingBlocksResponse.status === 200) {
            const allSpeakingData = speakingBlocksResponse.data
              .filter(
                (item) =>
                  item.block_threshold === 0 &&
                  item.exam_category === category &&
                  filterByIELTSCategory({ name: item.name }, ieltsCategory)
              )
              .map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setAllSpeakingData(allSpeakingData);
          }
        } else {
          const examBlocksResponse = await ajaxCall(
            `/exam-blocks/?fields=id,block_type,exam_category,exam_name,no_of_questions,exam_type&exam_type=${activeTab}&exam_category=${category}`,
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
          if (examBlocksResponse.status === 200) {
            if (category === "GENERAL") {
              const mockTestData = examBlocksResponse.data.filter(
                ({ exam_name, block_type, exam_category }) =>
                  block_type === "Assignments" &&
                  exam_category === category &&
                  !exam_name.includes("Assignment") &&
                  studentCourses?.some((item) => exam_name.includes(item))
              );
              setAllMockTestData(mockTestData);
            } else {
              const mockTestData = examBlocksResponse.data.filter(
                ({ block_type, exam_category, exam_name }) =>
                  block_type === "Assignments" &&
                  exam_category === category &&
                  filterByIELTSCategory({ name: exam_name }, ieltsCategory)
              );
              setAllMockTestData(mockTestData);
            }
          }
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab, category, ieltsCategory, studentCourses]);

  const testByExamType = (examType) =>
    allMockTestData.filter(({ exam_type }) => exam_type === examType);
  const givenWritingTest = testByExamType("Writing").filter((item) =>
    givenTest?.some((index) => index === item.id)
  );
  const givenST = allSpeakingData.filter((item) =>
    givenSpeakingTest?.some((index) => index === item.id)
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
                      <h4>Mini Test {category && ` (Course: ${category})`}</h4>
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
                              <option value="Grammer">Grammer</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    {count === 0 ? (
                      <BuyCourse message="No Mini Test Available, Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          {tabs.map(
                            ({ name }) =>
                              activeTab === name && (
                                <TestTable
                                  key={name}
                                  testData={
                                    name === "Speaking"
                                      ? allSpeakingData
                                      : testByExamType(name)
                                  }
                                  givenTest={givenTest}
                                  testType={name}
                                  givenSpeakingTest={givenSpeakingTest}
                                  isLoading={isLoading}
                                />
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {(activeTab === "Writing" || activeTab === "Speaking") && (
                    <MTAssessment
                      testType={activeTab}
                      givenWritingTest={givenWritingTest}
                      givenSpeakingTest={givenST}
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

export default MockTest;
