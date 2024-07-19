import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../UI/Loading";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import SelectionBox from "../../../UI/SelectionBox";

const initialResourceData = {
  student: "",
  batch: "",
  course: "",
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

  const createRL = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const formData = new FormData();

      formData.append("student", createRLData.student);
      formData.append("batch", createRLData.batch);
      formData.append("course", createRLData.course);

      createRLData.documents.forEach((document, index) => {
        formData.append(`documents[${index}]`, document);
      });
      createRLData.descriptions.forEach((description, index) => {
        formData.append(`descriptions[${index}]`, description);
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
          onClick={() => setActiveButton("student")}
        >
          Student
        </button>
        <button
          className={`default__button ${
            activeButton === "course" ? "active bg-success" : ""
          }`}
          onClick={() => setActiveButton("course")}
        >
          Course
        </button>
        <button
          className={`default__button ${
            activeButton === "batch" ? "active bg-success" : ""
          }`}
          onClick={() => setActiveButton("batch")}
        >
          Batch
        </button>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            {(activeButton === "student" || activeButton === "course") && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Course</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    url="/courselistforpackage/"
                    name="Course_Title"
                    objKey={["Course_Title"]}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            {(activeButton === "student" ||
              activeButton === "course" ||
              activeButton === "batch") && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Batch</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    url="/batchview/"
                    name="batch_name"
                    objKey={["batch_name"]}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            {activeButton === "student" && (
              <div className="col-xl-6 mt-3">
                <div className="dashboard__select__heading">
                  <span>Student</span>
                </div>
                <div className="dashboard__selector">
                  <SingleSelection
                    value={createRLData?.student}
                    onChange={(val) => {
                      dispatchCreateRL({
                        type: "student",
                        value: val,
                      });
                    }}
                    url="/student-list/"
                    objKey={["full_name"]}
                  />
                </div>
              </div>
            )}
          </div>
          {createRLData.documents.map((_, index) => (
            <div className="row mt-4" key={index}>
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
                <Loading color="primary" text="Creating Resource Link..." />
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
