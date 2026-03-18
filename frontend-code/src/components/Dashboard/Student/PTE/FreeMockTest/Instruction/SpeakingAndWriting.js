import React from "react";

const SpeakingAndWriting = ({ type, startTest }) => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Part 1: Speaking and Writing</h3>
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
            <td className="instruction-table-td">Personal introduction</td>
            <td className="instruction-table-td">1 minute</td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="5"
            >
              Section 2
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
              }}
            >
              Read aloud
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="5"
            >
              30-35 minutes
            </td>
          </tr>
          <tr>
            <td className="instruction-table-td">Repeat sentence</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Describe image</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Re-tell lecture</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Answer short question</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Section 3-4</td>
            <td className="instruction-table-td">2 * Summarize written text</td>
            <td className="instruction-table-td">20 minutes</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Section 5</td>
            <td className="instruction-table-td">
              Summarize written text OR Essay
            </td>
            <td className="instruction-table-td">10 or 20 minutes</td>
          </tr>
          <tr>
            <td className="instruction-table-td">Section 6</td>
            <td className="instruction-table-td">Essay</td>
            <td className="instruction-table-td">20 minutes</td>
          </tr>
        </tbody>
      </table>
      <button
        className="default__button"
        onClick={() => {
          type === "speaking" ? startTest("speaking") : startTest("writing");
        }}
      >
        Start
      </button>
    </div>
  );
};

export default SpeakingAndWriting;
