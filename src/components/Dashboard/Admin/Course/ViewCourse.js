import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  "No.",
  "Course Title",
  "Enrollment Start Date",
  "Enrollment End Date",
  "Max Enrollment",
  "Course Overview",
  "Level",
  "Language",
  "Primary Instructor",
];

const ViewCourse = ({ search, selectedCategory, selectedLevel }) => {
  const [courseList, setCouresList] = useState([]);

  const getCourses = async () => {
    try {
      const response = await ajaxCall(
        `/courselistview`,
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
        setCouresList(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCourses();
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
          {courseList.map((course, index) => (
            <tr
              key={index + 1}
              className={`${index % 2 === 0 ? "" : "dashboard__table__row"}`}
            >
              <th>
                <div>{index + 1}.</div>
              </th>
              <td>{course.Course_Title}</td>
              <td>
                <div className="dashboard__table__star">
                  {course.EnrollmentStartDate}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.EnrollmentEndDate}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.max_enrollments}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.Course_Overview_Provider}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.Level.name}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.Language.name}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {course.primary_instructor.first_name}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewCourse;
