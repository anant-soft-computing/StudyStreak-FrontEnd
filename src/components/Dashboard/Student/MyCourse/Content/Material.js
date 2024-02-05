import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";

const Material = ({ courseId, courseName }) => {
  const [courseMaterial, setCourseMaterial] = useState([]);
  const getCourseMaterial = async () => {
    try {
      const response = await ajaxCall(
        `/course-materials/${courseId}`,
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
        setCourseMaterial(response?.data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getCourseMaterial();
  }, [courseId]);

  return (
    <div className="col-xl-12 col-lg-9 col-md-12">
      <div className="dashboard__content__wraper">
        <div className="dashboard__section__title">
          <h4>Course Material</h4>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="dashboard__table table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {courseMaterial?.map(
                    ({ id, material_name, course_material }, index) => (
                      <tr
                        key={id}
                        className={`${
                          index % 2 === 0 ? "" : "dashboard__table__row"
                        }`}
                      >
                        <th>
                          <span>{material_name}</span>
                          <p className="mt-2">
                            Course : <span>{courseName}</span>
                          </p>
                        </th>
                        <td></td>
                        <td></td>
                        <td style={{ width: "0%" }}>
                          <div className="dashboard__button__group">
                            <a
                              className="dashboard__small__btn__2"
                              href={course_material}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="icofont-download" />
                              Download
                            </a>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Material;
