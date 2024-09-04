import React, { useEffect, useState } from "react";
import ScoreCard from "../../../../Exam-Answer/ScoreCard/ScoreCard";
import { useLocation, useParams } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import SmallModal from "../../../../UI/Modal";

const ViewMTAAssessment = () => {
  const { examId } = useParams();
  const { examType } = useLocation().state || {};
  const [wAssData, setWAssData] = useState({});
  const [sAssData, setSASSData] = useState({});
  const [assessment, setAssessment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          examType === "Writing"
            ? `/exam-block-answers/${examId}/`
            : `/speaking-block/answers/${examId}/`,
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

  const openModal = (content) => {
    setAssessment(content);
    setIsModalOpen(true);
  };

  const parseAssessment = (assessment) => {
    const sections = {};
    const regex =
      /(?:Task Achievement:|Coherence and Cohesion:|Lexical Resource:|Grammatical Range and Accuracy:)/g;
    const matches = assessment?.split(regex);
    const titles = assessment?.match(regex);

    if (titles && matches) {
      titles?.forEach((title, index) => {
        sections[title.trim()] = matches[index + 1]?.trim() || "No data";
      });
    }
    return sections;
  };

  const aiAssessmentSections = wAssData?.AI_Assessment
    ? parseAssessment(wAssData?.AI_Assessment)
    : {};

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
                      Assessment For :{" "}
                      {examType === "Writing"
                        ? wAssData?.exam_name
                        : sAssData?.exam_name}
                    </h4>

                    <div>
                      {examType === "Writing" && (
                        <h4 className="sidebar__title">
                          Band : {wAssData?.band}
                        </h4>
                      )}
                      {examType === "Writing" && (
                        <div>
                          <div className="writing__exam">
                            <div className="dashboard__section__title">
                              <h4 className="sidebar__title">AI Assessment</h4>
                            </div>
                            <div className="gptResponse">
                              {Object.keys(aiAssessmentSections)?.length >
                                0 && (
                                <>
                                  <h4>#Explanation:</h4>
                                  {Object.keys(aiAssessmentSections)?.map(
                                    (section, index) => (
                                      <div key={index}>
                                        <br />
                                        <strong>{section}</strong>
                                        <div>
                                          {aiAssessmentSections[section]}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="writing__exam">
                            <div className="dashboard__section__title">
                              <h4 className="sidebar__title">
                                Tutor Assessment
                              </h4>
                            </div>
                            {wAssData?.Tutor_Assessment ? (
                              <div className="gptResponse">
                                {wAssData?.Tutor_Assessment}
                              </div>
                            ) : (
                              <h5 className="text-center text-danger">
                                Assessment By Tutor Will Be Displayed Here{" "}
                              </h5>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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
                          {sAssData.student_answers?.map((item, index) => (
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
                                {item.AI_Assessment ? (
                                  <button
                                    className="take-test"
                                    onClick={() =>
                                      openModal(item.AI_Assessment)
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
                                      openModal(item.Tutor_Assessment)
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
          {assessment}
        </SmallModal>
      )}
    </>
  );
};

export default ViewMTAAssessment;
