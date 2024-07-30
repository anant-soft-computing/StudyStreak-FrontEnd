import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BandScoreCard from "../../../../Exam-Answer/BandScoreCard";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ViewPTAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};
  const [band, setBand] = useState(0);
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
          const studentAnswers = response?.data?.student_answers[examType];
          const totalBand = studentAnswers?.reduce(
            (sum, item) => sum + parseFloat(item.band),
            0
          );
          setBand(totalBand / studentAnswers?.length);
          setExamName(response?.data?.name);
          setAssessment(response?.data?.student_answers);
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
                    Assessment For : {examName}
                  </h4>
                  <h4 className="sidebar__title">Band : {band}</h4>
                  {examType === "Writing" && (
                    <div>
                      {assessment?.Writing?.some(
                        (item) => item?.ai_assessment
                      ) ? (
                        <div className="writing__exam">
                          <div className="dashboard__section__title">
                            <h4 className="sidebar__title">AI Assessment</h4>
                          </div>
                          {assessment?.Writing.map(
                            (item, index) =>
                              item?.ai_assessment && (
                                <div>
                                  <div key={index} className="gptResponse">
                                    ({index + 1}). {item.ai_assessment}
                                  </div>
                                  <br />
                                </div>
                              )
                          )}
                        </div>
                      ) : (
                        <h5 className="text-center text-danger">
                          No AI Assessment Available !!
                        </h5>
                      )}

                      {assessment?.Writing?.some(
                        (item) => item?.tutor_assessment
                      ) ? (
                        <div className="writing__exam">
                          <div className="dashboard__section__title">
                            <h4 className="sidebar__title">Tutor Assessment</h4>
                          </div>
                          {assessment?.Writing.map(
                            (item, index) =>
                              item?.tutor_assessment && (
                                <div>
                                  <div key={index} className="gptResponse">
                                    ({index + 1}). {item.tutor_assessment}
                                  </div>
                                  <br />
                                </div>
                              )
                          )}
                        </div>
                      ) : (
                        <h5 className="text-center text-danger">
                          No Tutor Assessment Available !!
                        </h5>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {examType === "Speaking" && (
                <div className="col-xl-12">
                  <div className="dashboard__table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Question Number</th>
                          <th>Answer Audio</th>
                          <th>AI Assessment</th>
                          <th>Tutor Assessment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessment?.Speaking?.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "" : "dashboard__table__row"
                            }`}
                          >
                            <td>{index + 1}.</td>
                            <td>
                              <audio controls>
                                <source
                                  src={`https://studystreak.in/${item.answer_audio}`}
                                  type="audio/mpeg"
                                />
                              </audio>
                            </td>
                            <td>{item.ai_assessment || "-"}</td>
                            <td>{item.tutor_assessment || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {examType === "Writing" && <BandScoreCard />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPTAssessment;
