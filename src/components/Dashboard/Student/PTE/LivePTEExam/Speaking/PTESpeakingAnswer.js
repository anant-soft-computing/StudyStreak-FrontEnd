import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const PTESpeakingAnswer = () => {
  const { examId } = useParams();
  const [examName, setExamName] = useState("");
  const [assessment, setAssessment] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${examId}/`,
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
          setExamName(response?.data?.name);
          setAssessment(response?.data?.student_answers?.Speaking);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="container">
          <h4 className="sidebar__title">Assessment For : {examName}</h4>
          <div className="dashboard__section__title">
            <h4 className="sidebar__title">AI Assessment</h4>
          </div>
          {assessment.map((item, index) => {
            return (
              <div key={index}>
                <h4>({index + 1}) Explanation : </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.ai_assessment,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PTESpeakingAnswer;
