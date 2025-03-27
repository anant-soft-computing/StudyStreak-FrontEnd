import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";
import ajaxCall from "../../../../../../../helpers/ajaxCall";

const RASpeakingAnswer = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    category: "",
    sub_category: "",
    practice_test_type: "",
  });
  const [assessment, setAssessment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [stats, setStats] = useState({
    sentenceCount: 0,
    wordCount: 0,
    audioDuration: "0 sec",
  });

  const handleOpenModal = (assessmentItem) => {
    setSelectedAssessment(assessmentItem);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!selectedAssessment) return;

    if (selectedAssessment.ai_assessment) {
      const cleanText = selectedAssessment.ai_assessment.replace(
        /<[^>]+>/g,
        " "
      );
      const sentences = (cleanText.match(/[.!?]+/g) || []).length;
      const words = cleanText.split(/\s+/).length;

      setStats((prev) => ({
        ...prev,
        sentenceCount: sentences,
        wordCount: words,
      }));
    }
  }, [selectedAssessment]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
          setExamData({
            name: response?.data?.name,
            category: response?.data?.category,
            sub_category: response?.data?.sub_category,
            practice_test_type: response?.data?.practice_test_type,
          });
          setAssessment(response?.data?.student_answers?.Speaking || []);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [examId]);

  const extractScores = (aiAssessment) => {
    if (!aiAssessment) return null;

    const contentMatch = aiAssessment.match(/<p>Content:.*?Score: ([\d.]+)\/5/);
    const pronunciationMatch = aiAssessment.match(
      /<p>Pronunciation:.*?Score: ([\d.]+)\/5/
    );
    const oralFluencyMatch = aiAssessment.match(
      /<p>Oral Fluency:.*?Score: ([\d.]+)\/5/
    );
    const totalMatch = aiAssessment.match(/#Total Score: ([\d.]+)\/90/);

    return {
      content: contentMatch ? parseFloat(contentMatch[1]) : 0,
      pronunciation: pronunciationMatch ? parseFloat(pronunciationMatch[1]) : 0,
      oralFlunecy: oralFluencyMatch ? parseFloat(oralFluencyMatch[1]) : 0,
      total: totalMatch ? parseFloat(totalMatch[1]) : 0,
      maxContent: 5,
      maxPronunciation: 5,
      maxOralFlunecy: 5,
      maxTotal: 90,
    };
  };

  const scores = selectedAssessment
    ? extractScores(selectedAssessment.ai_assessment)
    : null;

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="body__wrapper">
          <div className="main_wrapper overflow-hidden">
            <div className="container">
              <div className="row">
                <h4 className="sidebar__title">
                  Assessment For: {examData.name}
                </h4>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="dashboard__table table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Exam Name</th>
                            <th>Exam Category</th>
                            <th>Exam Type</th>
                            <th>View Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessment?.map((item, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "" : "dashboard__table__row"
                              }
                            >
                              <td>{index + 1}</td>
                              <td>{examData.name}</td>
                              <td>{examData.category}</td>
                              <td>{examData.practice_test_type}</td>
                              <td>
                                {item.ai_assessment ? (
                                  <button
                                    className="take-test"
                                    onClick={() => handleOpenModal(item)}
                                  >
                                    View
                                  </button>
                                ) : (
                                  "-"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SmallModal
        size="lg"
        centered
        title="Your Score"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <div className="text-center mb-2">
            <h5>Your Answer</h5>
            <audio controls className="audio-player mx-auto">
              <source
                src={selectedAssessment?.answer_audio}
                type="audio/mpeg"
              />
            </audio>
          </div>
          <div>
            <h5>Statistics</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Senetence Count</td>
                  <td>{stats.sentenceCount}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Word Count</td>
                  <td>{stats.wordCount}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Your Audio Duration</td>
                  <td>{stats.audioDuration}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Question time</td>
                  <td>40 sec</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Short pause count</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Long pause count</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Average speed</td>
                  <td>10 words per minute</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="progress-section mb-2">
            <h5>Your Score Details:</h5>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Content</span>
                <span>
                  {scores?.content}/{scores?.maxContent}
                </span>
              </div>
              <ProgressBar
                variant="success"
                now={(scores?.content / scores?.maxContent) * 100}
              />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Pronunciation</span>
                <span>
                  {scores?.pronunciation}/{scores?.maxPronunciation}
                </span>
              </div>
              <ProgressBar
                variant="success"
                now={(scores?.pronunciation / scores?.maxPronunciation) * 100}
              />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Oral Fluency</span>
                <span>
                  {scores?.oralFlunecy}/{scores?.maxOralFlunecy}
                </span>
              </div>
              <ProgressBar
                variant="success"
                now={(scores?.oralFlunecy / scores?.maxOralFlunecy) * 100}
              />
            </div>
          </div>
          <div className="progress-section mb-2">
            <h5>Your Total Score:</h5>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Read Audio</span>
                {scores?.total}/{scores?.maxTotal}
              </div>
              <ProgressBar
                variant="success"
                now={(scores?.total / scores?.maxTotal) * 100}
              />
            </div>
          </div>
        </div>
      </SmallModal>
    </div>
  );
};

export default RASpeakingAnswer;
