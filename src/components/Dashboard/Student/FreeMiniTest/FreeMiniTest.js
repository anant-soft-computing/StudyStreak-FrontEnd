import React, { useEffect, useState } from "react";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";

const FreeMiniTest = () => {
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examType, setExamType] = useState("Reading");
  const [examCategoryy, setExamCategoryy] = useState("IELTS");
  const [ieltsCategory, setIeltsCategory] = useState("Academic");

  const examSubCategory = [
    { name: "Academic", value: "Academic" },
    { name: "General", value: "General" },
    { name: "Foundation", value: "Foundation" },
    { name: "Grammar", value: "Grammar" },
  ];

  const examCategory = [
    { name: "IELTS", value: "IELTS" },
    { name: "GENERAL", value: "GENERAL" },
  ];

  const examTypes =
    examCategoryy === "IELTS"
      ? [
          { name: "Reading", value: "Reading" },
          { name: "Writing", value: "Writing" },
          { name: "Listening", value: "Listening" },
          { name: "Speaking", value: "Speaking" },
        ]
      : [{ name: "General", value: "General" }];

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

  const takeTest = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          window.open(
            `${
              examType === "General"
                ? "/GENERAL-MiniLiveExam"
                : examType !== "Speaking"
                ? "/MiniLiveExam"
                : "/Speaking-MiniLiveExam"
            }/${examType}/${params.data.id}`,
            "_blank"
          )
        }
      >
        Take Test
      </button>
    );
  };

  useEffect(() => {
    if (examCategoryy !== "GENERAL") {
      setExamType("Reading");
    } else {
      setExamType("General");
    }
  }, [examCategoryy]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (examType === "Speaking") {
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
            const allSpeakingData = speakingBlocksResponse?.data
              ?.filter(
                (item) =>
                  item.block_threshold === 0 &&
                  item.exam_category === examCategoryy &&
                  filterByIELTSCategory({ name: item.name }, ieltsCategory)
              )
              ?.map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setTestData(allSpeakingData);
          }
        } else {
          const examBlocksResponse = await ajaxCall(
            `/exam/blocks/?exam_type=${examType}&exam_category=${examCategoryy}&sub_category=${
              examCategoryy === "IELTS" ? ieltsCategory : ""
            }`,
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
            if (examType === "General") {
              const mockTestData = examBlocksResponse.data.filter(
                ({ exam_name, block_type }) =>
                  block_type === "Assignments" &&
                  !exam_name.includes("Assignment")
              );
              setTestData(mockTestData);
            } else {
              const mockTestData = examBlocksResponse.data.filter(
                ({ block_type }) => block_type === "Assignments"
              );
              setTestData(mockTestData);
            }
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [examCategoryy, examType, ieltsCategory]);

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: takeTest,
      filter: true,
      width: 310,
    },
    { headerName: "Name", field: "exam_name", filter: true, width: 380 },
    {
      headerName: "No. Of Questions",
      field: "no_of_questions",
      filter: true,
      width: 380,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
      cellRenderer: (params) => params.data.exam_category || "-",
      width: 380,
    },
  ];
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
                      <h4>Free Mini Test</h4>
                      <div className="d-flex gap-2 flex-column flex-sm-row align-items-start align-items-md-center">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Exam Category</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={examCategoryy}
                              onChange={(e) => setExamCategoryy(e.target.value)}
                            >
                              {examCategory.map((item) => (
                                <option key={item} value={item.value}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Exam Type</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={examType}
                              onChange={(e) => setExamType(e.target.value)}
                            >
                              {examTypes.map((item) => (
                                <option key={item} value={item.value}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {examCategoryy === "IELTS" && (
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Exam Sub Category</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={ieltsCategory}
                                onChange={(e) =>
                                  setIeltsCategory(e.target.value)
                                }
                              >
                                {examSubCategory.map((item) => (
                                  <option key={item} value={item.value}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        {isLoading ? (
                          <Loading />
                        ) : testData.length > 0 ? (
                          <Table rowData={testData} columnDefs={columns} />
                        ) : (
                          <h5 className="text-center text-danger">
                            No Free Mini Tests Available !!
                          </h5>
                        )}
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

export default FreeMiniTest;
