import React, { useReducer } from "react";
import SingleSelection from "../../../UI/SingleSelect";

const initialCLA = {
  lesson: "",
  documents: [""],
  descriptions: [""],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCLA = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialCLA;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const CreateLessonAttachment = () => {
  const [createLAData, dispatchCreateLA] = useReducer(reducerCLA, initialCLA);

  const addContent = () => {
    dispatchCreateLA({
      type: "documents",
      value: [...createLAData.documents, ""],
    });
    dispatchCreateLA({
      type: "descriptions",
      value: [...createLAData.descriptions, ""],
    });
  };

  const removeContent = (index) => {
    const updatedDocuments = createLAData.documents.filter(
      (_, i) => i !== index
    );
    const updatedDescriptions = createLAData.descriptions.filter(
      (_, i) => i !== index
    );
    dispatchCreateLA({
      type: "documents",
      value: updatedDocuments,
    });
    dispatchCreateLA({
      type: "descriptions",
      value: updatedDescriptions,
    });
  };

  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Lesson</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection isSearch={true} />
        </div>
      </div>
      {createLAData.documents.map((_, index) => (
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
                      const updatedDocuments = [...createLAData.documents];
                      updatedDocuments[index] = file;
                      dispatchCreateLA({
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
                    placeholder="Description of Lesson Attechment"
                    value={createLAData.descriptions[index]}
                    onChange={(e) => {
                      const updatedDescriptions = [
                        ...createLAData.descriptions,
                      ];
                      updatedDescriptions[index] = e.target.value;
                      dispatchCreateLA({
                        type: "descriptions",
                        value: updatedDescriptions,
                      });
                    }}
                  />
                  {createLAData.documents.length > 1 && (
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

      <div className="create__course__bottom__button text-center mt-4">
        <button className="default__button">Create Lesson Attachment</button>
      </div>
    </div>
  );
};

export default CreateLessonAttachment;
