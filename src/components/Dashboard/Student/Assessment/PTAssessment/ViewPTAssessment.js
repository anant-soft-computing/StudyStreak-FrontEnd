import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ScoreCard from "../../../../Exam-Answer/ScoreCard/ScoreCard";
import ajaxCall from "../../../../../helpers/ajaxCall";
import SmallModal from "../../../../UI/Modal";
import { speakingAssessment } from "../../../../../utils/assessment/speakingAssessment";
import WritingAnswerTable from "../../../../Exam-Answer/AnswerTable/WritingAnswerTable";
import SpeakingAnswerTable from "../../../../Exam-Answer/AnswerTable/SpeakingAnswerTable";
import { getBackgroundColor } from "../../../../../utils/background/background";

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
          setExamName(response?.data?.name);
          setBand(totalBand / studentAnswers?.length);
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
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <h4 className="sidebar__title">
                      Assessment For : {examName}
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
                      Band : {band?.toFixed(1)}
                    </h4>
                  </div>
                  {examType === "Writing" ? (
                    <WritingAnswerTable data={assessment?.Writing} />
                  ) : (
                    <SpeakingAnswerTable
                      data={assessment?.Speaking}
                      viewAIA={handleOpenModal}
                      viewTutor={handleOpenTAModal}
                    />
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
        {Object.keys(speakingAssessment(sAssessment)).map((section, index) => (
          <div key={index}>
            <br />
            <strong>{section}</strong>
            <div>{speakingAssessment(sAssessment)[section]}</div>
          </div>
        ))}
      </SmallModal>
      <SmallModal
        size="lg"
        centered
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
      >
        {sTAssessment}
      </SmallModal>
    </div>
  );
};

export default ViewPTAssessment;
