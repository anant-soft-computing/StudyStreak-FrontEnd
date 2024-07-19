import React, { useEffect, useState } from "react";
import BandScoreCard from "./BandScoreCard";
import ajaxCall from "../../helpers/ajaxCall";
import { useParams } from "react-router-dom";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";

const FullLengthTestAnswer = () => {
  const { examId } = useParams();
  const [rStudentAnswers, setRStudentAnswers] = useState([]);
  const [rCorrectAnswers, setRCorrectAnswers] = useState([]);

  const [lStudentAnswers, setLStudentAnswers] = useState([]);
  const [lCorrectAnswers, setLCorrectAnswers] = useState([]);

  const [writingTestAnswers, setWritingTestAnswers] = useState([]);
  const [speakingTestAnswers, setSpeakingTestAnswers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/flt-answers/${examId}/`,
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
          setWritingTestAnswers(response?.data?.writing_set?.student_answers);
          setSpeakingTestAnswers(response?.data?.speaking_set?.student_answers);

          let rstudentAnswers;
          let rcorrectAnswer = [];

          rstudentAnswers =
            response?.data?.reading_set?.student_answers?.Reading?.reduce(
              (acc, curr) => {
                return acc.concat(curr?.answers);
              },
              []
            );
          rcorrectAnswer.push(
            ...response?.data?.reading_set?.correct_answers?.Reading?.reduce(
              (acc, curr) => {
                return acc.concat(curr?.answers);
              },
              []
            )
          );
          setRStudentAnswers(rstudentAnswers);
          setRCorrectAnswers(rcorrectAnswer);

          let lstudentAnswers;
          let lcorrectAnswer = [];

          lstudentAnswers =
            response.data?.listening_set?.student_answers?.Listening?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );
          lcorrectAnswer.push(
            ...response.data?.listening_set?.correct_answers?.Listening?.reduce(
              (acc, curr) => {
                return acc.concat(curr?.answers);
              },
              []
            )
          );
          setLStudentAnswers(lstudentAnswers);
          setLCorrectAnswers(lcorrectAnswer);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">
                    Solution For : Full Length Test
                  </h4>
                  <div style={{ marginTop: "50px" }}>

                    {/* Reading */}
                    <div className="dashboard__section__title">
                      <h4 className="sidebar__title">Reading :- </h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="dashboard__table table-responsive table__height">
                          <table>
                            <thead>
                              <tr>
                                <th>Question No.</th>
                                <th>Correct Answer</th>
                                <th>Your Answer</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {rCorrectAnswers?.map(
                                (
                                  { id, question_number, answer_text },
                                  index
                                ) => (
                                  <tr
                                    key={id}
                                    className={`${
                                      index % 2 === 0
                                        ? ""
                                        : "dashboard__table__row"
                                    }`}
                                  >
                                    <td className="text-dark">
                                      {question_number}.
                                    </td>
                                    <td className="text-dark">
                                      <div className="dashboard__table__star">
                                        {answer_text}
                                      </div>
                                    </td>
                                    <td className="text-dark">
                                      {rStudentAnswers?.length > 0 &&
                                        rStudentAnswers[index] &&
                                        rStudentAnswers[index]?.answer_text}
                                    </td>
                                    <td className="text-dark">
                                      {rStudentAnswers?.length > 0 &&
                                      rStudentAnswers[index] &&
                                      rCorrectAnswers[
                                        index
                                      ]?.answer_text.includes(" OR ") ? (
                                        rCorrectAnswers[index]?.answer_text
                                          .split(" OR ")
                                          .map((option) =>
                                            option?.trim()?.toLowerCase()
                                          )
                                          .includes(
                                            rStudentAnswers[
                                              index
                                            ]?.answer_text?.toLowerCase()
                                          ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        )
                                      ) : rStudentAnswers?.length > 0 &&
                                        rStudentAnswers[index] &&
                                        rCorrectAnswers[
                                          index
                                        ]?.answer_text?.includes(" AND ") ? (
                                        rCorrectAnswers[index]?.answer_text
                                          .split(" AND ")
                                          .map((option) =>
                                            option?.trim()?.toLowerCase()
                                          )
                                          .every((option) =>
                                            rStudentAnswers[index]?.answer_text
                                              ?.toLowerCase()
                                              ?.includes(option)
                                          ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        )
                                      ) : rStudentAnswers?.length > 0 &&
                                        rStudentAnswers[index] &&
                                        rStudentAnswers[index]?.answer_text ===
                                          rCorrectAnswers[index]
                                            ?.answer_text ? (
                                        <CheckIcon />
                                      ) : (
                                        <CancelIcon />
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Writing */}
                    <div className="dashboard__section__title mt-4">
                      <h4 className="sidebar__title">Writing :-</h4>
                    </div>
                    <div className="row">
                      <div>
                        <div className="writing__exam">
                          <div className="dashboard__section__title">
                            <h4 className="sidebar__title">AI Assessment</h4>
                          </div>
                          {writingTestAnswers?.Writing?.map((item, index) => {
                            return (
                              <div>
                                <div key={index} className="gptResponse">
                                  ({index + 1}). {item?.ai_assessment}
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
                          {writingTestAnswers?.Writing?.map((item, index) => {
                            return (
                              <div>
                                <div key={index} className="gptResponse">
                                  ({index + 1}). {item?.tutor_assessment}
                                </div>
                                <br />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Listening */}
                    <div className="dashboard__section__title mt-4">
                      <h4 className="sidebar__title">Listening :-</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="dashboard__table table-responsive table__height">
                          <table>
                            <thead>
                              <tr>
                                <th>Question No.</th>
                                <th>Correct Answer</th>
                                <th>Your Answer</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {lCorrectAnswers?.map(
                                (
                                  { id, question_number, answer_text },
                                  index
                                ) => (
                                  <tr
                                    key={id}
                                    className={`${
                                      index % 2 === 0
                                        ? ""
                                        : "dashboard__table__row"
                                    }`}
                                  >
                                    <td className="text-dark">
                                      {question_number}.
                                    </td>
                                    <td className="text-dark">
                                      <div className="dashboard__table__star">
                                        {answer_text}
                                      </div>
                                    </td>
                                    <td className="text-dark">
                                      {lStudentAnswers?.length > 0 &&
                                        lStudentAnswers[index] &&
                                        lStudentAnswers[index]?.answer_text}
                                    </td>
                                    <td className="text-dark">
                                      {lStudentAnswers?.length > 0 &&
                                      lStudentAnswers[index] &&
                                      lCorrectAnswers[
                                        index
                                      ]?.answer_text.includes(" OR ") ? (
                                        lCorrectAnswers[index]?.answer_text
                                          .split(" OR ")
                                          .map((option) =>
                                            option?.trim()?.toLowerCase()
                                          )
                                          .includes(
                                            lStudentAnswers[
                                              index
                                            ]?.answer_text?.toLowerCase()
                                          ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        )
                                      ) : lStudentAnswers?.length > 0 &&
                                        lStudentAnswers[index] &&
                                        lCorrectAnswers[
                                          index
                                        ]?.answer_text?.includes(" AND ") ? (
                                        lCorrectAnswers[index]?.answer_text
                                          .split(" AND ")
                                          .map((option) =>
                                            option?.trim()?.toLowerCase()
                                          )
                                          .every((option) =>
                                            lStudentAnswers[index]?.answer_text
                                              ?.toLowerCase()
                                              ?.includes(option)
                                          ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        )
                                      ) : lStudentAnswers?.length > 0 &&
                                        lStudentAnswers[index] &&
                                        lStudentAnswers[index]?.answer_text ===
                                          lCorrectAnswers[index]
                                            ?.answer_text ? (
                                        <CheckIcon />
                                      ) : (
                                        <CancelIcon />
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Speaking */}
                    <div className="dashboard__section__title mt-4">
                      <h4 className="sidebar__title">Speaking :-</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="dashboard__table table-responsive table__height">
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
                              {speakingTestAnswers?.Speaking?.map(
                                (item, index) => (
                                  <tr
                                    key={index}
                                    className={`${
                                      index % 2 === 0
                                        ? ""
                                        : "dashboard__table__row"
                                    }`}
                                  >
                                    <td>{index + 1}</td>
                                    <td>
                                      <audio controls>
                                        <source
                                          src={`https://studystreak.in/${item?.answer_audio}`}
                                          type="audio/mpeg"
                                        />
                                      </audio>
                                    </td>
                                    <td>{item.ai_assessment || "-"}</td>
                                    <td>{item.tutor_assessment || "-"}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
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

export default FullLengthTestAnswer;