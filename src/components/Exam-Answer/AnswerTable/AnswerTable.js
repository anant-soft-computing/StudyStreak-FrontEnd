import React from "react";
import SkipIcon from "../../UI/SkipIcon";
import CheckIcon from "../../UI/CheckIcon";
import CancelIcon from "../../UI/CancelIcon";

const AnswerTable = ({ correctAnswer, studentAnswer, tableTitle }) => {
  return (
    <div className="writing__exam">
      <div className="dashboard__section__title">
        {tableTitle ? (
          <h4 className="sidebar__title">{tableTitle}</h4>
        ) : (
          <h4 className="sidebar__title">Answer Table</h4>
        )}
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="dashboard__table table-responsive">
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
                {correctAnswer.map(({ id, answer_text }, index) => {
                  let icon;
                  const studentAnswerText =
                    studentAnswer?.[index]?.answer_text?.trim();
                  const correctAnswerText = answer_text?.trim();

                  if (!studentAnswerText) {
                    icon = <SkipIcon />;
                  } else if (correctAnswerText.includes(" OR ")) {
                    const correctOptions = correctAnswerText
                      .split(" OR ")
                      .map((option) => option.trim().toLowerCase());
                    icon = correctOptions.includes(
                      studentAnswerText.toLowerCase()
                    ) ? (
                      <CheckIcon />
                    ) : (
                      <CancelIcon />
                    );
                  } else if (correctAnswerText.includes(" AND ")) {
                    const correctOptions = correctAnswerText
                      .split(" AND ")
                      .map((option) => option.trim().toLowerCase());
                    icon = correctOptions.every((option) =>
                      studentAnswerText.toLowerCase().includes(option)
                    ) ? (
                      <CheckIcon />
                    ) : (
                      <CancelIcon />
                    );
                  } else {
                    icon =
                      studentAnswerText === correctAnswerText ? (
                        <CheckIcon />
                      ) : (
                        <CancelIcon />
                      );
                  }
                  return (
                    <tr
                      key={id}
                      className={`${
                        index % 2 === 0 ? "" : "dashboard__table__row"
                      }`}
                    >
                      <td className="text-dark">{index + 1}.</td>
                      <td className="text-dark">
                        <div className="dashboard__table__star">
                          {correctAnswerText}
                        </div>
                      </td>
                      <td className="text-dark">{studentAnswerText}</td>
                      <td className="text-dark">{icon}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerTable;
