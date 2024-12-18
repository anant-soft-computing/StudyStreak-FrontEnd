import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../../helpers/ajaxCall";

const LevelOfStudent = () => {
  const [givenDiagnosticTest, setGivenDiagnosticTest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          "/given-diagnostic/?name=Diagnostic",
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
          setGivenDiagnosticTest(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    givenDiagnosticTest?.length > 0 && (
      <div>
        <h4
          className="sidebar__title"
          style={{ marginBottom: "0px", marginTop: "20px" }}
        >
          Level Of Student
        </h4>
        <div className="row">
          {givenDiagnosticTest.map((data, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 column__custom__class"
            >
              <div className="gridarea__wraper text-center card-background">
                <div className="gridarea__content p-2 m-2">
                  <div className="gridarea__heading">
                    <h3>{data?.flt_name}</h3>
                    <h3>
                      Given Date : {moment(data?.submitted_date).format("lll")}
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-center mt-2 mb-3">
                    <button
                      className="default__button"
                      onClick={() =>
                        window.open(
                          `/diagnostic-test-answer/${data?.flt_id}`,
                          "_blank"
                        )
                      }
                    >
                      View Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default LevelOfStudent;
