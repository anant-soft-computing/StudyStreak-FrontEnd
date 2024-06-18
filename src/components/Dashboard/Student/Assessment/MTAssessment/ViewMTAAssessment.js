import React, { useEffect, useState } from "react";
import BandScoreCard from "../../../../Exam-Answer/BandScoreCard";
import { useLocation, useParams } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ViewMTAAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};
  const [wAssData, setWAssData] = useState({});
  const [sAssData, setSASSData] = useState({});

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
            : setSASSData(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId, examType]);

  return (
    <div className='body__wrapper'>
      <div className='main_wrapper overflow-hidden'>
        <div className='blogarea__2 sp_top_100 sp_bottom_100'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-8 col-lg-8 AnswerCard'>
                <div className='blog__details__content__wraper'>
                  <h4 className='sidebar__title'>
                    Assessment For :{" "}
                    {examType === "Writing"
                      ? wAssData?.exam_name
                      : sAssData?.exam_name}
                  </h4>

                  <div>
                    {examType === "Writing" && (
                      <h4 className='sidebar__title'>
                        Band : {wAssData?.band}
                      </h4>
                    )}
                    {examType === "Writing" && (
                      <div>
                        <div className='writing__exam'>
                          <div className='dashboard__section__title'>
                            <h4 className='sidebar__title'>AI Assessment</h4>
                          </div>
                          <div className='gptResponse'>
                            {wAssData?.AI_Assessment}
                          </div>
                        </div>
                        <div className='writing__exam'>
                          <div className='dashboard__section__title'>
                            <h4 className='sidebar__title'>Tutor Assessment</h4>
                          </div>
                          <div className='gptResponse'>
                            {wAssData?.Tutor_Assessment}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {examType === "Speaking" && (
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='dashboard__table table-responsive'>
                      <table>
                        <thead>
                          <tr>
                            <th>Question Number</th>
                            <th>Question</th>
                            <th>Answer Audio</th>
                            <th>AI Assessment</th>
                            <th>Tutor Assessment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sAssData.student_answers?.map((answer, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? "" : "dashboard__table__row"
                              }`}
                            >
                              <td>{answer.question_number}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: answer.question,
                                }}
                              />
                              <td>
                                <audio controls>
                                  <source
                                    src={`https://studystreak.in/${answer.answer_audio}`}
                                    type='audio/mpeg'
                                  />
                                </audio>
                              </td>
                              <td>{answer.AI_Assessment || "-"}</td>
                              <td>{answer.Tutor_Assessment || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default ViewMTAAssessment;
