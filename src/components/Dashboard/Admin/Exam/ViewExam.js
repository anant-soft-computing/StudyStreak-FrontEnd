import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  "No.",
  "Exam Name",
  "Exam Type",
  "No. of Questions",
  "Block Type",
  "Difficulty Level",
  "Block Threshold",
];

const ViewExam = ({ search, selectedCategory, selectedLevel }) => {
  const [examList, setExamList] = useState([]);

  const getExams = async () => {
    try {
      const response = await ajaxCall(
        `/exam-blocks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        setExamList(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getExams();
  }, [search, selectedCategory, selectedLevel]);

  return (
    <div className="dashboard__table table-responsive">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (  
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {examList.map((exam, index) => (
            <tr
              key={index + 1}
              className={`${index % 2 === 0 ? "" : "dashboard__table__row"}`}
            >
              <th>
                <div>{index + 1}.</div>
              </th>
              <td>
                <div className="dashboard__table__star">
                  <Link
                    to="/live-writing-exam"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    {exam.exam_name}
                  </Link>
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">{exam.exam_type}</div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {exam.no_of_questions}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">{exam.block_type}</div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {exam.difficulty_level}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {exam.block_threshold}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewExam;
