import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ScoreCard from "../../../../Exam-Answer/ScoreCard/ScoreCard";
import ajaxCall from "../../../../../helpers/ajaxCall";
import SmallModal from "../../../../UI/Modal";
import { writingAssessment } from "../../../../../utils/assessment/writingAssessment";
import { speakingAssessment } from "../../../../../utils/assessment/speakingAssessment";

const ViewPTAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};
  const [band, setBand] = useState(0);
  const [examName, setExamName] = useState("");
  const [assessment, setAssessment] = useState([]);
  const [sAssessment, setSAssessment] = useState("");
  const [sTAssessment, setSTAssessment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  const handleOpenModal = (content) => {
    setSAssessment(content);
    setIsModalOpen(true);
  };

  const handleOpenTAModal = (content) => {
    setSTAssessment(content);
    setIsTutorModalOpen(true);
  };

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
          const totalBand = studentAnswers?.reduce((sum, item) => {
            const bandValue = item.band !== null ? parseFloat(item.band) : 0;
            return sum + bandValue;
          }, 0);
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
    <>
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
                      <>
                        <div className="writing__exam">
                          <div className="dashboard__section__title">
                            <h4 className="sidebar__title">AI Assessment</h4>
                          </div>
                          {assessment?.Writing?.map((item, index) => {
                            const assessments = writingAssessment(
                              item.ai_assessment
                            );
                            return (
                              <div key={index}>
                                <div className="gptResponse">
                                  <h4>({index + 1}) Explanation:</h4>
                                  {Object.keys(assessments)?.map(
                                    (section, i) => (
                                      <div key={i}>
                                        <br />
                                        <strong>{section}</strong>
                                        <div>{assessments[section]}</div>
                                      </div>
                                    )
                                  )}
                                </div>
                                <br />
                              </div>
                            );
                          })}
                        </div>
                        <div className="writing__exam">
                          <div className="dashboard__section__title">
                            <h4 className="sidebar__title">Tutor Assessment</h4>
                          </div>
                          {assessment?.Writing?.some(
                            (item) => item?.tutor_assessment
                          ) ? (
                            assessment?.Writing?.map((item, index) => (
                              <div key={index}>
                                <div className="gptResponse">
                                  ({index + 1}). {item.tutor_assessment}
                                </div>
                                <br />
                              </div>
                            ))
                          ) : (
                            <h5 className="text-center text-danger">
                              Assessment By Tutor Will Be Displayed Here
                            </h5>
                          )}
                        </div>
                      </>
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
                            <th>Band</th>
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
                              <td>{index + 1}</td>
                              <td>
                                <audio controls>
                                  <source
                                    src={`https://studystreak.in/${item.answer_audio}`}
                                    type="audio/mpeg"
                                  />
                                </audio>
                              </td>
                              <td>
                                {item.ai_assessment ? (
                                  <button
                                    className="take-test"
                                    onClick={() =>
                                      handleOpenModal(item.ai_assessment)
                                    }
                                  >
                                    View
                                  </button>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td>
                                {item.tutor_assessment ? (
                                  <button
                                    className="take-test"
                                    onClick={() =>
                                      handleOpenTAModal(item.tutor_assessment)
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
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {examType === "Writing" && <ScoreCard />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {Object.keys(speakingAssessment(sAssessment)).map(
            (section, index) => (
              <div key={index}>
                <br />
                <strong>{section}</strong>
                <div>{speakingAssessment(sAssessment)[section]}</div>
              </div>
            )
          )}
        </SmallModal>
      )}
      {isTutorModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isTutorModalOpen}
          onClose={() => setIsTutorModalOpen(false)}
        >
          {sTAssessment}
        </SmallModal>
      )}
    </>
  );
};

export default ViewPTAssessment;
