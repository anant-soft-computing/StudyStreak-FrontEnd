import React from "react";

const SpeakingAnswerTable = ({ data, viewAIA, viewTA }) => {
  return (
    <div className="row">
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
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "" : "dashboard__table__row"}
                >
                  <td>{index + 1}</td>
                  <td>
                    <audio controls>
                      <source
                        src={item.answer_audio}
                        type="audio/mpeg"
                      />
                    </audio>
                  </td>
                  <td>
                    {item.ai_assessment ? (
                      <button
                        className="take-test"
                        onClick={() => viewAIA(item.ai_assessment)}
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
                        onClick={() => viewTA(item.tutor_assessment)}
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
    </div>
  );
};

export default SpeakingAnswerTable;
