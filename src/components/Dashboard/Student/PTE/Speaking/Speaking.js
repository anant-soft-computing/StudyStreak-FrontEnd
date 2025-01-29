import React, { useEffect, useState } from "react";
import Table from "../../../../UI/Table";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";
import ajaxCall from "../../../../../helpers/ajaxCall";

const pteSpeakingCategory = [
  { name: "Read aloud [RA]", value: "RA" },
  { name: "Repeat sentence [RS]", value: "RS" },
  { name: "Describe image [DI]", value: "DI" },
  { name: "Re-tell lecture [RL]", value: "RL" },
  { name: "Answer short question [ASQ]", value: "ASQ" },
  { name: "Respond to a sitution [RTS]", value: "RTS" },
  { name: "Summarize group discussion [SGD]", value: "SGD" },
];

const Speaking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [givenTest, setGivenTest] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);
  const [subCategory, setSubCategory] = useState(pteSpeakingCategory[0].value);

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
  }, []);

  const testButton = (params) => {
    const { id: examId, sub_category } = params.data;
    const isGiven = givenTest?.some((test) => test === examId);

    return isGiven ? (
      <button
        className="take-test"
        style={{ backgroundColor: "green", border: "1px solid green" }}
      >
        Review Test
      </button>
    ) : (
      <button
        className="take-test"
        onClick={() => {
          if (sub_category === "RA") {
            window.open(`/PTE/IELTS/Speaking/RA/${examId}`, "_blank");
          } else {
            window.open(`/PTE/IELTS/Speaking/ASQ/${examId}`, "_blank");
          }
        }}
      >
        Take Test
      </button>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/ct/ielts/practice-tests/?exam_type=Speaking&category=PTE&sub_category=${subCategory}`,
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
          setSpeakingData(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [subCategory]);

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: testButton,
      width: 200,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return params.data.IELTS?.Name;
      },
      filter: true,
      width: 350,
    },
    {
      headerName: "Questions",
      field: "questions",
      cellRenderer: (params) => {
        return params.data.speaking_block_count;
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Time",
      field: "time",
      cellRenderer: () => {
        return "15 Minutes";
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.some((test) => test === examId);

        return isGiven ? (
          <button className="given-tag" style={{ backgroundColor: "green" }}>
            Given
          </button>
        ) : (
          <button className="given-tag" style={{ backgroundColor: "red" }}>
            Not Given
          </button>
        );
      },
      filter: true,
      width: 300,
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
                      <h4>PTE Speaking</h4>
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>Speaking Exam Type</label>
                          <select
                            className="form-select"
                            name="speakingExamType"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                          >
                            {pteSpeakingCategory.map((item, index) => (
                              <option key={index} value={item.value}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : speakingData.length > 0 ? (
                        <Table rowData={speakingData} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Speaking Tests Available !!
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
  );
};

export default Speaking;
