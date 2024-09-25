import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialPaperTestData = {
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

const reducerCreatePaperTest = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialPaperTestData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const CreatePaperTest = ({ setActiveTab }) => {
  const [createPTData, dispatchCreatePT] = useReducer(
    reducerCreatePaperTest,
    initialPaperTestData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeButton, setActiveButton] = useState("student");
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreatePT({ type: "reset" });
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    switch (buttonType) {
      case "student":
        dispatchCreatePT({ type: "course", value: [] });
        dispatchCreatePT({ type: "batch", value: [] });
        dispatchCreatePT({ type: "courseId", value: [] });
        dispatchCreatePT({ type: "batchId", value: [] });
        break;
      case "course":
        dispatchCreatePT({ type: "student", value: [] });
        dispatchCreatePT({ type: "batch", value: [] });
        dispatchCreatePT({ type: "studentId", value: [] });
        dispatchCreatePT({ type: "batchId", value: [] });
        break;
      case "batch":
        dispatchCreatePT({ type: "student", value: [] });
        dispatchCreatePT({ type: "course", value: [] });
        dispatchCreatePT({ type: "studentId", value: [] });
        dispatchCreatePT({ type: "courseId", value: [] });
        break;
      default:
        break;
    }
  };

  const addContent = () => {
    dispatchCreatePT({
      type: "documents",
      value: [...createPTData.documents, ""],
    });
    dispatchCreatePT({
      type: "descriptions",
      value: [...createPTData.descriptions, ""],
    });
  };

  const removeContent = (index) => {
    const updatedDocuments = createPTData.documents.filter(
      (_, i) => i !== index
    );
    const updatedDescriptions = createPTData.descriptions.filter(
      (_, i) => i !== index
    );
    dispatchCreatePT({
      type: "documents",
      value: updatedDocuments,
    });
    dispatchCreatePT({
      type: "descriptions",
      value: updatedDescriptions,
    });
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreatePT({
        type: fieldName,
        value: val,
      });
      dispatchCreatePT({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreatePT({
      type: fieldName,
      value: val,
    });
    dispatchCreatePT({
      type: proFieldName,
      value: newValIds,
    });
  };

  const createPT = async (e) => {
    e.preventDefault();
    const vaildField = createPTData.documents.every(
      (doc, index) => doc && createPTData.descriptions[index]
    );
    if (!vaildField) {
      setFormStatus({
        isError: true,
        errMsg: "Documents and Descriptions Required",
        isSubmitting: false,
      });
      return;
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const formData = new FormData();

      createPTData.studentId.forEach((id) => {
        formData.append(`student`, id);
      });
      createPTData.courseId.forEach((id) => {
        formData.append(`course`, id);
      });
      createPTData.batchId.forEach((id) => {
        formData.append(`batch`, id);
      });

      formData.append("link", createPTData.link);

      createPTData.documents.forEach((document, index) => {
        if (document) {
          formData.append(`documents[${index}]`, document);
        }
      });
      createPTData.descriptions.forEach((description, index) => {
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
        setActiveTab("View Paper Test");
        toast.success("Paper Test Created Successfully");
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

  const handleDescriptionChange = (index, value) => {
    const descriptionPrefix = "Paper Test - ";

    if (!value.startsWith(descriptionPrefix)) {
      value = descriptionPrefix;
    }

    const updatedDescriptions = [...createPTData.descriptions];
    updatedDescriptions[index] = value;
    dispatchCreatePT({
      type: "descriptions",
      value: updatedDescriptions,
    });
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
                    value={createPTData?.student}
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
                    value={createPTData?.course}
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
                    value={createPTData?.batch}
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
                    value={createPTData?.link}
                    onChange={(e) => {
                      dispatchCreatePT({
                        type: "link",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {createPTData.documents.map((_, index) => (
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
                          const updatedDocuments = [...createPTData.documents];
                          updatedDocuments[index] = file;
                          dispatchCreatePT({
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
                        placeholder="Paper Test - Add your description here"
                        value={createPTData.descriptions[index]}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                      />
                      {createPTData.documents.length > 1 && (
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
                  onClick={createPT}
                  disabled={formStatus.isSubmitting}
                >
                  Create Paper Test
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePaperTest;