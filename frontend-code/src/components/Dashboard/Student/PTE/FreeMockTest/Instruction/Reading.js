import React from "react";

const Reading = ({ startTest }) => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Part 2: Reading</h3>
      <table className="instruction-table">
        <thead>
          <tr>
            <th className="instruction-table-header">Item type</th>
            <th className="instruction-table-header">Time allowed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
              }}
            >
              Reading & Writing: Fill in the blanks
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="5"
            >
              29-30 minutes
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">
              Multiple-choice, choose multiple answers{" "}
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">Re-order Paragraphs</td>
          </tr>
          <tr>
            <td className="instruction-table-td">
              Reading: Fill in the blanks
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">
              Multiple-choice, choose single answers
            </td>
          </tr>
        </tbody>
      </table>
      <button className="default__button" onClick={() => startTest("reading")}>
        Start
      </button>
    </div>
  );
};

export default Reading;
