import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../UI/Table";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";
import ajaxCall from "../../../../../helpers/ajaxCall";

const pteWritingCategory = [
  { name: "Summarize written text [SWT]", value: "SWT" },
  { name: "Write essay [WE]", value: "WE" },
];

const Writing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [givenTest, setGivenTest] = useState([]);
  const [writingData, setWritingData] = useState([]);
  const [subCategory, setSubCategory] = useState(pteWritingCategory[0].value);

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
    const { id: examId, IELTS, sub_category } = params.data;
    const paperId = IELTS?.id;
    const isGiven = givenTest?.some((test) => test === examId);

    return isGiven ? (
      <button
        className="take-test"
        onClick={() => {
          navigate(`/PTE/Writing/${paperId}`);
        }}
        style={{ backgroundColor: "green", border: "1px solid green" }}
      >
        Review Test
      </button>
    ) : (
      <button
        className="take-test"
        onClick={() =>
          window.open(`/PTE/IELTS/Writing/${sub_category}/${examId}`, "_blank")
        }
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
          `/ct/ielts/practice-tests/?exam_type=Writing&category=PTE&sub_category=${subCategory}`,
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
          setWritingData(response?.data);
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
        return params.data.writing_block_count;
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Time",
      field: "time",
      cellRenderer: () => {
        return "60 Minutes";
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
                      <h4>PTE Writing</h4>
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>Writing Exam Type</label>
                          <select
                            className="form-select"
                            name="writingExamType"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                          >
                            {pteWritingCategory.map((item, index) => (
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
                      ) : writingData.length > 0 ? (
                        <Table rowData={writingData} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Writing Tests Available !!
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

export default Writing;
