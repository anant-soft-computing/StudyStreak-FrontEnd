import React from "react";
import { writingAssessment } from "../../../utils/assessment/writingAssessment";

const WritingAnswerTable = ({ data }) => {
  return (
    <div className="row">
      <div className="writing__exam">
        <div className="dashboard__section__title">
          <h4 className="sidebar__title">AI Assessment</h4>
        </div>
        {data?.map((item, index) => {
          const assessments = writingAssessment(item.ai_assessment);
          return (
            <div key={index}>
              <div className="gptResponse">
                <h4>({index + 1}) Explanation:</h4>
                {Object.keys(assessments)?.map((section, i) => (
                  <div key={i}>
                    <br />
                    <strong>{section}</strong>
                    <div>{assessments[section]}</div>
                  </div>
                ))}
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
        {data?.some((item) => item.tutor_assessment) ? (
          data?.map((item, index) => (
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
    </div>
  );
};

export default WritingAnswerTable;
