import React from "react";

const Seven = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Part 1: Speaking and Writing</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                backgroundColor: "#f4f4f4",
                textAlign: "left",
              }}
            >
              Section
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                backgroundColor: "#f4f4f4",
                textAlign: "left",
              }}
            >
              Item type
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                backgroundColor: "#f4f4f4",
                textAlign: "left",
              }}
            >
              Time allowed
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Section 1
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Personal introduction
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              1 minute
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="5"
            >
              Section 2
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Read aloud
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                verticalAlign: "top",
              }}
              rowSpan="5"
            >
              30-35 minutes
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Repeat sentence
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Describe image
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Re-tell lecture
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Answer short question
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Section 3-4
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              2 * Summarize written text
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              20 minutes
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Section 5
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Summarize written text OR Essay
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              10 or 20 minutes
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              Section 6
            </td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>Essay</td>
            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
              20 minutes
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Seven;
