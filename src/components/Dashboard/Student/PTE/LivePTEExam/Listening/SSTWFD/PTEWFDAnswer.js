import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";
import ajaxCall from "../../../../../../../helpers/ajaxCall";

const PTEWFDAnswer = () => {
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
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [missedWords, setMissedWords] = useState("");
  const [scoreDisplay, setScoreDisplay] = useState("0/0 [0%]");

  const handleOpenModal = (item) => {
    setSelectedAssessment(item);
    setIsModalOpen(true);
  };

  const findMissedWords = (correctText, studentText) => {
    if (!correctText || !studentText) return "";

    const correctWords = correctText.toLowerCase().split(/\s+/);
    const studentWords = studentText.toLowerCase().split(/\s+/);

    const missed = correctWords
      .filter((word) => !studentWords.includes(word))
      .join(" ");

    return missed || "All words correct";
  };

  const calculateScore = (correctText, studentText, missedWordsText) => {
    if (!correctText || !studentText) return "0/0 [0%]";

    const correctWords = correctText.split(/\s+/);
    const studentWords = studentText.split(/\s+/);
    const missedWordsCount =
      missedWordsText === "All words correct"
        ? 0
        : missedWordsText.split(/\s+/).length;

    const correctWordsCount = correctWords.length;
    const studentCorrectCount = studentWords.length - missedWordsCount;

    // Calculate percentage
    const percentage = Math.round(
      (studentCorrectCount / correctWordsCount) * 100
    );

    return `${studentCorrectCount}/${correctWordsCount} [${percentage}%]`;
  };

  const fetchExamData = useCallback(async () => {
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
        const correctAnswer = response?.data?.correct_answers?.Listening.filter(
          (item) => item.block_id === selectedAssessment.block_id
        );
        setExamData({
          name: response?.data?.name,
          category: response?.data?.category,
          sub_category: response?.data?.sub_category,
          practice_test_type: response?.data?.practice_test_type,
        });
        setAssessment(response?.data?.student_answers?.Listening);
        setCorrectAnswer(correctAnswer);

        if (
          correctAnswer[0]?.answers?.[0]?.answer_text &&
          selectedAssessment?.answers?.[0]?.answer_text
        ) {
          const correctText = correctAnswer[0].answers[0].answer_text;
          const studentText = selectedAssessment.answers[0].answer_text;

          const missed = findMissedWords(correctText, studentText);
          setMissedWords(missed);

          const score = calculateScore(correctText, studentText, missed);
          setScoreDisplay(score);
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [examId, selectedAssessment?.block_id, selectedAssessment?.answers]);

  useEffect(() => {
    fetchExamData();
  }, [examId, fetchExamData]);

  // Extract percentage for progress bar
  const progressPercentage = parseInt(
    scoreDisplay.match(/\[(\d+)%\]/)?.[1] || "0"
  );

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
      {selectedAssessment && (
        <SmallModal
          size="lg"
          centered
          title="Your Score"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            <div className="mb-2">
              <h6>Correct Answer:</h6>
              <div className="border p-2">
                {correctAnswer[0]?.answers &&
                  correctAnswer[0]?.answers[0]?.answer_text && (
                    <p>{correctAnswer[0]?.answers[0].answer_text}</p>
                  )}
              </div>
            </div>
            <div className="mb-2">
              <h6>Your Answer:</h6>
              <div className="border p-2">
                {selectedAssessment.answers &&
                  selectedAssessment.answers[0]?.answer_text && (
                    <p>{selectedAssessment.answers[0].answer_text}</p>
                  )}
              </div>
            </div>
            <div className="mb-2">
              <h6>Missed Words:</h6>
              <div className="border p-2">
                <p>{missedWords}</p>
              </div>
            </div>
            <div className="progress-section mb-2">
              <h5>Your Total Score:</h5>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <span>Write From Dictation</span>
                  <span>{scoreDisplay}</span>
                </div>
                <ProgressBar variant="success" now={progressPercentage} />
              </div>
            </div>
          </div>
        </SmallModal>
      )}
    </div>
  );
};

export default PTEWFDAnswer;
