import React from "react";

const Listening = ({ startTest }) => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Part 3: Listening</h3>
      <table className="instruction-table">
        <thead>
          <tr>
            <th className="instruction-table-header">Section</th>
            <th className="instruction-table-header">Item type</th>
            <th className="instruction-table-header">Time allowed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="instruction-table-td">Section 1</td>
            <td className="instruction-table-td">
              1 or 2 Summarize spoken text
            </td>
            <td className="instruction-table-td">10-20 minutes</td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="7"
            >
              Section 2
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
              }}
            >
              Multiple-choice, choose multiple answers
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="7"
            >
              29-30 minutes
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">Fill in the blanks</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Highlight correct summary</td>
          </tr>
          <tr>
            <td className="instruction-table-td">
              Multiple-choice, choose single answer
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">Select missing word</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Higlight incorrect words</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Write from dictation</td>
          </tr>
        </tbody>
      </table>
      <button
        className="default__button"
        onClick={() => startTest("listening")}
      >
        Start
      </button>
    </div>
  );
};

export default Listening;
