import React from "react";

const WritingAnswerTable = ({ data }) => {
  return (
    <div className="row">
      <div className="writing__exam">
        <div className="dashboard__section__title">
          <h4 className="sidebar__title">AI Assessment</h4>
        </div>
        {data?.filter((item) => item.ai_assessment?.trim()).length > 0 ? (
          data
            ?.filter((item) => item.ai_assessment?.trim())
            .map((item, index) => (
              <div key={index} className="gptResponse d-flex gap-2">
                <h4>({index + 1})</h4>
                <div dangerouslySetInnerHTML={{ __html: item.ai_assessment }} />
              </div>
            ))
        ) : (
          <h5 className="text-center text-danger">
            No AI Assessment Available
          </h5>
        )}
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
