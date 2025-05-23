import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";

const FullLengthTest = () => {
  const navigate = useNavigate();
  const { count, packageCount } = useLocation().state || {};
  const [givenTest, setGivenTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullLengthTestData, setFullLengthTestData] = useState([]);
  const [ieltsCategory, setIeltsCategory] = useState("Academic");
  const category = JSON.parse(localStorage.getItem("course"))?.course_category;

  const sortedFLT = fullLengthTestData.sort((a, b) => {
    const getNumber = (name) => {
      const match = name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    const nameA = getNumber(a.name);
    const nameB = getNumber(b.name);
    return nameA - nameB;
  });

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
          setGivenTest(response?.data?.student_flt);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/ct/flts/?is_diagnostic=false&is_quick=false&category=${category}&sub_category=${ieltsCategory}`,
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
          setFullLengthTestData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category, ieltsCategory]);

  const handleFullLengthTest = (examId) => {
    if (count === 0) {
      toast.error(
        "You Do Not Have Any Test Available, Please Upgrade Package !!"
      );
    } else {
      window.open(`/FullLengthLiveExam/${examId}`, "_blank");
    }
  };

  const viewFullLengthTest = (examId) => {
    navigate(`/FullLengthTest/Answer/${examId}`);
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test === examId);
        if (isGiven) {
          return (
            <button
              className="take-test"
              style={{ backgroundColor: "green", border: "1px solid green" }}
              onClick={() => viewFullLengthTest(params.data.id)}
            >
              Review Test
            </button>
          );
        }
        return (
          <button
            className="take-test"
            onClick={() => handleFullLengthTest(params.data.id)}
          >
            Take Test
          </button>
        );
      },
    },
    {
      headerName: "Name",
      field: "name",
      filter: true,
      width: 250,
    },
    {
      headerName: "Reading Set",
      field: "reading_block_count",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_block_count",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_block_count",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_block_count",
      filter: true,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test === examId);
        if (isGiven) {
          return (
            <button className="given-tag" style={{ backgroundColor: "green" }}>
              Given
            </button>
          );
        } else {
          return (
            <button className="given-tag" style={{ backgroundColor: "red" }}>
              Not Given
            </button>
          );
        }
      },
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
                      <h4>Full Length Test</h4>
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
                      <BuyCourse message="No Full Length Test Available, Please Buy a Course !!" />
                    ) : isLoading ? (
                      <Loading />
                    ) : sortedFLT.length > 0 ? (
                      <Table rowData={sortedFLT} columnDefs={columns} />
                    ) : (
                      <h5 className="text-center text-danger">
                        No Tests Available !!
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
  );
};

export default FullLengthTest;
