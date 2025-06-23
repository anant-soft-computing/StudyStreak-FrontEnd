import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Loading from "../../../../../UI/Loading";
import SmallModal from "../../../../../UI/Modal";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const PTEWritingAnswer = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    category: "",
    sub_category: "",
    practice_test_type: "",
  });
  const [blockData, setBlockData] = useState({
    exam_name: "",
  });
  const [assessment, setAssessment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState("");

  const handleOpenModal = (assessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
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
        setExamData({
          name: response?.data?.name,
          category: response?.data?.category,
          sub_category: response?.data?.sub_category,
          practice_test_type: response?.data?.practice_test_type,
        });
        setAssessment(response?.data?.student_answers?.Writing);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchExamData();
  }, [examId, fetchExamData]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam/block/${selectedAssessment?.block_id}/`,
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
          setBlockData({
            exam_name: response?.data?.exam_name,
          });
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedAssessment?.block_id]);

  const tableData = (answerText) => {
    const paragraphs = answerText
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0);
    const sentences = answerText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    const words = answerText.split(/\s+/).filter((w) => w.trim().length > 0);

    return {
      paragraphCount: paragraphs.length,
      sentenceCount: sentences.length,
      wordCount: words.length,
    };
  };

  const extractScores = (aiAssessment) => {
    if (!aiAssessment) return null;

    if (examData?.sub_category === "SWT") {
      const content = aiAssessment.match(/<p>Content:.*?Score: ([\d.]+)\/2/);
      const form = aiAssessment.match(/<p>Form:.*?Score: ([\d.]+)\/1/);
      const grammar = aiAssessment.match(/<p>Grammar:.*?Score: ([\d.]+)\/2/);
      const vocabulary = aiAssessment.match(
        /<p>Vocabulary:.*?Score: ([\d.]+)\/2/
      );
      const totalMatch = aiAssessment.match(/<p>Total Score: ([\d.]+)\/7/);

      return {
        content: content ? parseFloat(content[1]) : 0,
        form: form ? parseFloat(form[1]) : 0,
        grammar: grammar ? parseFloat(grammar[1]) : 0,
        vocabulary: vocabulary ? parseFloat(vocabulary[1]) : 0,
        total: totalMatch ? parseFloat(totalMatch[1]) : 0,
        maxContent: 2,
        maxForm: 1,
        maxGrammar: 2,
        maxVocabulary: 2,
        maxTotal: 7,
      };
    } else {
      const content = aiAssessment.match(/<p>Content:.*?Score: ([\d.]+)\/3/);
      const form = aiAssessment.match(/<p>Form:.*?Score: ([\d.]+)\/2/);
      const development = aiAssessment.match(
        /<p>Development, Structure, and Coherence:.*?Score: ([\d.]+)\/2/
      );
      const grammar = aiAssessment.match(/<p>Grammar:.*?Score: ([\d.]+)\/2/);
      const general = aiAssessment.match(
        /<p>General linguistic:.*?Score: ([\d.]+)\/2/
      );
      const vocabulary = aiAssessment.match(
        /<p>Vocabulary:.*?Score: ([\d.]+)\/2/
      );
      const spelling = aiAssessment.match(/<p>Spelling:.*?Score: ([\d.]+)\/2/);
      const totalMatch = aiAssessment.match(/<p>Total Score: ([\d.]+)\/15/);

      return {
        content: content ? parseFloat(content[1]) : 0,
        form: form ? parseFloat(form[1]) : 0,
        development: development ? parseFloat(development[1]) : 0,
        grammar: grammar ? parseFloat(grammar[1]) : 0,
        general: general ? parseFloat(general[1]) : 0,
        vocabulary: vocabulary ? parseFloat(vocabulary[1]) : 0,
        spelling: spelling ? parseFloat(spelling[1]) : 0,
        total: totalMatch ? parseFloat(totalMatch[1]) : 0,
        maxContent: 3,
        maxForm: 2,
        maxDevelopment: 2,
        maxGrammar: 2,
        maxGeneral: 2,
        maxVocabulary: 2,
        maxSpelling: 2,
        maxTotal: 15,
      };
    }
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
      {selectedAssessment && (
        <SmallModal
          size="lg"
          centered
          title={`Your Score For (${blockData?.exam_name})`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            <div className="mb-2">
              <h5>Grammar, Style and Spell Check:</h5>
              <div className="border p-2">
                {selectedAssessment.answers &&
                  selectedAssessment.answers[0]?.answer_text && (
                    <p>{selectedAssessment.answers[0].answer_text}</p>
                  )}
              </div>
            </div>
            <div>
              <h5>Text Analysis</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Paragraph Count</td>
                    <td>
                      {selectedAssessment.answers &&
                      selectedAssessment.answers[0]?.answer_text
                        ? tableData(selectedAssessment.answers[0].answer_text)
                            .paragraphCount
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Sentence Count</td>
                    <td>
                      {selectedAssessment.answers &&
                      selectedAssessment.answers[0]?.answer_text
                        ? tableData(selectedAssessment.answers[0].answer_text)
                            .sentenceCount
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Word Count</td>
                    <td>
                      {selectedAssessment.answers &&
                      selectedAssessment.answers[0]?.answer_text
                        ? tableData(selectedAssessment.answers[0].answer_text)
                            .wordCount
                        : 0}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Spelling error count</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Grammar error count</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="progress-section mb-2">
              <h5>Your Score Details:</h5>
              {examData?.sub_category === "SWT" ? (
                <div>
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
                      <span>Form</span>
                      <span>
                        {scores?.form}/{scores?.maxForm}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.form / scores?.maxForm) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Grammar</span>
                      <span>
                        {scores?.grammar}/{scores?.maxGrammar}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.grammar / scores?.maxGrammar) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Vocabulary</span>
                      <span>
                        {scores?.vocabulary}/{scores?.maxVocabulary}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.vocabulary / scores?.maxVocabulary) * 100}
                    />
                  </div>
                </div>
              ) : (
                <div>
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
                      <span>Form</span>
                      <span>
                        {scores?.form}/{scores?.maxForm}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.form / scores?.maxForm) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Development, Structure and Coherence</span>
                      <span>
                        {scores?.development}/{scores?.maxDevelopment}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.development / scores?.maxDevelopment) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Grammar</span>
                      <span>
                        {scores?.grammar}/{scores?.maxGrammar}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.grammar / scores?.maxGrammar) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>General Linguistic</span>
                      <span>
                        {scores?.general}/{scores?.maxGeneral}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.general / scores?.maxGeneral) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Vocabulary</span>
                      <span>
                        {scores?.vocabulary}/{scores?.maxVocabulary}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.vocabulary / scores?.maxVocabulary) * 100}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Spelling</span>
                      <span>
                        {scores?.spelling}/{scores?.maxSpelling}
                      </span>
                    </div>
                    <ProgressBar
                      variant="success"
                      now={(scores?.spelling / scores?.maxSpelling) * 100}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="progress-section mb-2">
              <h5>Your Total Score:</h5>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <span>
                    {examData?.sub_category === "SWT"
                      ? "Summarize Written Text"
                      : "Write Essay"}
                  </span>
                  <span>
                    {scores?.total}/{scores?.maxTotal}
                  </span>
                </div>
                <ProgressBar
                  variant="success"
                  now={(scores?.total / scores?.maxTotal) * 100}
                />
              </div>
            </div>
          </div>
        </SmallModal>
      )}
    </div>
  );
};

export default PTEWritingAnswer;
