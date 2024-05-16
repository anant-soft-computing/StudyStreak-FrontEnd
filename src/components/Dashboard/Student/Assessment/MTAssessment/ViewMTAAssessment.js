import React, { useEffect, useState } from "react";
import BandScoreCard from "../../../../Exam-Answer/BandScoreCard";
import { useLocation, useParams } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ViewMTAAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};
  const [wAssData, setWAssData] = useState({});
  const [sAssData, setSASSData] = useState([]);

  console.log("sAssData", sAssData);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          examType === "Writing"
            ? `/exam-block-answers/${examId}/`
            : `/speaking-block/answers/${examId}`,
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
          examType === "Writing"
            ? setWAssData(response.data)
            : setSASSData(response.data.student_answers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId, examType]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">
                    Assessment For : {wAssData?.exam_name} , Catogory :{" "}
                    {wAssData?.exam_catogery}
                  </h4>

                  <div>
                    <h4 className="sidebar__title">Band : {wAssData?.band}</h4>
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">AI Assessment</h4>
                      </div>
                      <div className="gptResponse">
                        {wAssData?.AI_Assessment}
                      </div>
                    </div>
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Tutor Assessment</h4>
                      </div>
                      <div className="gptResponse">
                        {wAssData?.Tutor_Assessment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <BandScoreCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMTAAssessment;
