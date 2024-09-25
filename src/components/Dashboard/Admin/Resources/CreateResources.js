import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialResourceData = {
  student: [],
  studentId: [],
  batch: [],
  batchId: [],
  course: [],
  courseId: [],
  link: "",
  documents: [""],
  descriptions: [""],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreateResource = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialResourceData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const CreateResourceLink = ({ setActiveTab }) => {
  const [createRLData, dispatchCreateRL] = useReducer(
    reducerCreateResource,
    initialResourceData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeButton, setActiveButton] = useState("student");
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateRL({ type: "reset" });
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    switch (buttonType) {
      case "student":
        dispatchCreateRL({ type: "course", value: [] });
        dispatchCreateRL({ type: "batch", value: [] });
        dispatchCreateRL({ type: "courseId", value: [] });
        dispatchCreateRL({ type: "batchId", value: [] });
        break;
      case "course":
        dispatchCreateRL({ type: "student", value: [] });
        dispatchCreateRL({ type: "batch", value: [] });
        dispatchCreateRL({ type: "studentId", value: [] });
        dispatchCreateRL({ type: "batchId", value: [] });
        break;
      case "batch":
        dispatchCreateRL({ type: "student", value: [] });
        dispatchCreateRL({ type: "course", value: [] });
        dispatchCreateRL({ type: "studentId", value: [] });
        dispatchCreateRL({ type: "courseId", value: [] });
        break;
      default:
        break;
    }
  };

  const addContent = () => {
    dispatchCreateRL({
      type: "documents",
      value: [...createRLData.documents, ""],
    });
    dispatchCreateRL({
      type: "descriptions",
      value: [...createRLData.descriptions, ""],
    });
  };

  const removeContent = (index) => {
    const updatedDocuments = createRLData.documents.filter(
      (_, i) => i !== index
    );
    const updatedDescriptions = createRLData.descriptions.filter(
      (_, i) => i !== index
    );
    dispatchCreateRL({
      type: "documents",
      value: updatedDocuments,
    });
    dispatchCreateRL({
      type: "descriptions",
      value: updatedDescriptions,
    });
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateRL({
        type: fieldName,
        value: val,
      });
      dispatchCreateRL({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateRL({
      type: fieldName,
      value: val,
    });
    dispatchCreateRL({
      type: proFieldName,
      value: newValIds,
    });
  };

  const createRL = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const formData = new FormData();

      createRLData.studentId.forEach((id) => {
        formData.append(`student`, id);
      });
      createRLData.courseId.forEach((id) => {
        formData.append(`course`, id);
      });
      createRLData.batchId.forEach((id) => {
        formData.append(`batch`, id);
      });

      formData.append("link", createRLData.link);

      createRLData.documents.forEach((document, index) => {
        if (document) {
          formData.append(`documents[${index}]`, document);
        }
      });
      createRLData.descriptions.forEach((description, index) => {
        if (description) {
          formData.append(`descriptions[${index}]`, description);
        }
      });

      const response = await ajaxCall(
        "/resources/",
        {
          headers: {
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Resources");
        toast.success("Resource Link Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <button
          className={`default__button ${
            activeButton === "student" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("student")}
        >
          Student
        </button>
        <button
          className={`default__button ${
            activeButton === "course" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("course")}
        >
          Course
        </button>
        <button
          className={`default__button ${
            activeButton === "batch" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("batch")}
        >
          Batch
        </button>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            {activeButton === "student" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Student</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createRLData?.student}
                    onSelect={addedSelectVal.bind(
                      null,
                      "student",
                      "studentId",
                      false
                    )}
                    url="/student-list/"
                    name="full_name"
                    objKey={["full_name"]}
                    isSearch={true}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            {activeButton === "course" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Course</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createRLData?.course}
                    onSelect={addedSelectVal.bind(
                      null,
                      "course",
                      "courseId",
                      false
                    )}
                    url="/courselistforpackage/"
                    name="Course_Title"
                    objKey={["Course_Title"]}
                    isSearch={true}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            {activeButton === "batch" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Batch</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createRLData?.batch}
                    onSelect={addedSelectVal.bind(
                      null,
                      "batch",
                      "batchId",
                      false
                    )}
                    url="/batchview/"
                    name="batch_name"
                    objKey={["batch_name"]}
                    isSearch={true}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Link</label>
                  <input
                    type="text"
                    placeholder="Link"
                    value={createRLData?.link}
                    onChange={(e) => {
                      dispatchCreateRL({
                        type: "link",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {createRLData.documents.map((_, index) => (
            <div className="row" key={index}>
              <div className="col-xl-6">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`documents-${index}`}>Document</label>
                    <div className="d-flex align-items-center">
                      <input
                        id={`documents-${index}`}
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updatedDocuments = [...createRLData.documents];
                          updatedDocuments[index] = file;
                          dispatchCreateRL({
                            type: "documents",
                            value: updatedDocuments,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`descriptions-${index}`}>Description</label>
                    <div className="d-flex align-items-center">
                      <input
                        id={`descriptions-${index}`}
                        type="text"
                        className="form-control"
                        placeholder="Description of Resource Link"
                        value={createRLData.descriptions[index]}
                        onChange={(e) => {
                          const updatedDescriptions = [
                            ...createRLData.descriptions,
                          ];
                          updatedDescriptions[index] = e.target.value;
                          dispatchCreateRL({
                            type: "descriptions",
                            value: updatedDescriptions,
                          });
                        }}
                      />
                      {createRLData.documents.length > 1 && (
                        <button
                          className="dashboard__small__btn__2 flash-card__remove__btn"
                          onClick={() => removeContent(index)}
                        >
                          <i className="icofont-ui-delete" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-xl-12">
            <button className="dashboard__small__btn__2" onClick={addContent}>
              + Description & Document
            </button>
          </div>

          <div className="col-xl-12 text-center">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Spinner animation="border" style={{ color: "#01579b" }} />
              ) : (
                <button
                  className="default__button"
                  onClick={createRL}
                  disabled={formStatus.isSubmitting}
                >
                  Create Resources
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateResourceLink;
