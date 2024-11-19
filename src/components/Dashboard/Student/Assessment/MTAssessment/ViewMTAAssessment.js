import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ScoreCard from "../../../../Exam-Answer/ScoreCard/ScoreCard";
import SmallModal from "../../../../UI/Modal";
import ajaxCall from "../../../../../helpers/ajaxCall";
import { writingAssessment } from "../../../../../utils/assessment/writingAssessment";
import { speakingAssessment } from "../../../../../utils/assessment/speakingAssessment";
import { getBackgroundColor } from "../../../../../utils/background/background";

const ViewMTAAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};

  const [band, setBand] = useState(0);
  const [examData, setExamData] = useState({});
  const [assessment, setAssessment] = useState("");
  const [tutorAssessment, setTutorAssessment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  const fetchExamData = useCallback(async () => {
    const endpoint =
      examType === "Writing"
        ? `/exam-block-answers/${examId}/`
        : `/speaking-block/answers/${examId}/`;
    try {
      const response = await ajaxCall(
        endpoint,
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
        setExamData(response?.data);
        setBand(calculateBand(response?.data, examType));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [examId, examType]);

  useEffect(() => {
    fetchExamData();
  }, [examId, examType, fetchExamData]);

  const calculateBand = (data, type) => {
    if (type === "Writing") return data.band;
    const totalBand = data.student_answers?.reduce(
      (sum, item) => sum + (parseFloat(item.band) || 0),
      0
    );
    return (totalBand / data.student_answers?.length).toFixed(1);
  };

  const handleAIAssessment = (content) => {
    setAssessment(content);
    setIsModalOpen(true);
  };

  const handleTutorAssessment = (content) => {
    setTutorAssessment(content);
    setIsTutorModalOpen(true);
  };

  const renderWritingAssessment = () => {
    const assessments = writingAssessment(examData?.AI_Assessment);
    return (
      <div>
        <div className="writing__exam" style={{ marginTop: "0px" }}>
          <div className="dashboard__section__title">
            <h4 className="sidebar__title">AI Assessment</h4>
          </div>
          <div className="gptResponse">
            {assessments ? (
              Object.entries(assessments).map(([section, content], index) => (
                <div key={index}>
                  <br />
                  <strong>{section}</strong>
                  <div>{content}</div>
                </div>
              ))
            ) : (
              <h5 className="text-center text-danger">
                "Assessment By AI Will Be Displayed Here"
              </h5>
            )}
          </div>
        </div>
        <div className="writing__exam">
          <div className="dashboard__section__title">
            <h4 className="sidebar__title">Tutor Assessment</h4>
          </div>
          {examData?.Tutor_Assessment ? (
            <div className="gptResponse">{examData.Tutor_Assessment}</div>
          ) : (
            <h5 className="text-center text-danger">
              Assessment By Tutor Will Be Displayed Here
            </h5>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <h4 className="sidebar__title">
                      Assessment For : {examData?.exam_name}
                    </h4>
                    <h4
                      style={{
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "25px",
                        border: "1px solid #01579b",
                        backgroundColor: getBackgroundColor(band),
                      }}
                    >
                      Score : {band}
                    </h4>
                  </div>
                  {examType === "Writing" ? (
                    renderWritingAssessment()
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>Question Number</th>
                                  <th>Answer Audio</th>
                                  <th>AI Assessment</th>
                                  <th>Tutor Assessment</th>
                                  <th>Score</th>
                                </tr>
                              </thead>
                              <tbody>
                                {examData?.student_answers?.map(
                                  (item, index) => (
                                    <tr
                                      key={index}
                                      className={
                                        index % 2 === 0
                                          ? ""
                                          : "dashboard__table__row"
                                      }
                                    >
                                      <td>{index + 1}</td>
                                      <td>
                                        <audio controls>
                                          <source
                                            src={item.answer_audio}
                                            type="audio/mpeg"
                                          />
                                        </audio>
                                      </td>
                                      <td>
                                        {item.AI_Assessment ? (
                                          <button
                                            className="take-test"
                                            onClick={() =>
                                              handleAIAssessment(
                                                item.AI_Assessment
                                              )
                                            }
                                          >
                                            View
                                          </button>
                                        ) : (
                                          "-"
                                        )}
                                      </td>
                                      <td>
                                        {item.Tutor_Assessment ? (
                                          <button
                                            className="take-test"
                                            onClick={() =>
                                              handleTutorAssessment(
                                                item.Tutor_Assessment
                                              )
                                            }
                                          >
                                            View
                                          </button>
                                        ) : (
                                          "-"
                                        )}
                                      </td>
                                      <td>{item.band || "-"}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <ScoreCard />
            </div>
          </div>
        </div>
      </div>
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {Object.entries(speakingAssessment(assessment)).map(
          ([section, content], index) => (
            <div key={index}>
              <br />
              <strong>{section}</strong>
              <div>{content}</div>
            </div>
          )
        )}
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
      >
        {tutorAssessment}
      </SmallModal>
    </div>
  );
};

export default ViewMTAAssessment;
