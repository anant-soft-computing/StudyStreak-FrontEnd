import React, { useReducer, useState } from "react";
import SelectionBox from "../../../UI/SelectionBox";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";

const initialPaperTestData = {
  course: [],
  courseId: [],
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
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreatePT({ type: "reset" });
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

      createPTData.courseId.forEach((id) => {
        formData.append(`course`, id);
      });

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
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
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
        </div>
        {createPTData.documents.map((_, index) => (
          <div className="row mt-3" key={index}>
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
              <Loading color="primary" text="Creating Paper Test..." />
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
  );
};

export default CreatePaperTest;