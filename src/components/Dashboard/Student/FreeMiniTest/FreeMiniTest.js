import React, { useEffect, useState } from "react";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";

const FreeMiniTest = () => {
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testType, setTestType] = useState("Reading");

  const takeTest = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          window.open(
            `${
              testType === "General"
                ? "general-exam"
                : testType !== "Speaking"
                ? "live-exam"
                : "live-speaking-exam"
            }/${testType}/${params.data.id}`,
            "_blank"
          )
        }
      >
        Take Test
      </button>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (testType === "Speaking") {
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
              ?.filter((item) => item.block_threshold === 0)
              ?.map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setTestData(allSpeakingData);
          }
        } else {
          const examBlocksResponse = await ajaxCall(
            `/exam-blocks/?fields=id,block_type,exam_category,exam_name,no_of_questions,exam_type&exam_type=${testType}`,
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
            if (testType === "General") {
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
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [testType]);

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
                            <label>Select Exam</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={(e) => setTestType(e.target.value)}
                              value={testType}
                            >
                              {[
                                "Reading",
                                "Writing",
                                "Listening",
                                "Speaking",
                                "General",
                              ].map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        {isLoading ? (
                          <Loading />
                        ) : testData.length > 0 ? (
                          <Table rowData={testData} columnDefs={columns} />
                        ) : (
                          <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
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
