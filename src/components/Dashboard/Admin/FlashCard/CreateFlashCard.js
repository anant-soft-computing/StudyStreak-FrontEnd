import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialFlashCardData = {
  course: "",
  title: "",
  description: "",
  set_priority: "",
  flash_card_items: [{ front: "", back: "" }],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerFlashCard = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialFlashCardData;
  }
  if (action.type === "flash_card_items") {
    return { ...state, flash_card_items: action.value };
  }
  return { ...state, [action.type]: action.value };
};

const CreateFlashCard = () => {
  const [flashCardData, dispatchFlashCardData] = useReducer(
    reducerFlashCard,
    initialFlashCardData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const validateForm = () => {
    if (!flashCardData.course) {
      setFormError("Course is Required");
      return false;
    }
    if (!flashCardData.title) {
      setFormError("Name is Required");
      return false;
    }
    if (!flashCardData.description) {
      setFormError("Description is Required");
      return false;
    }
    if (!flashCardData.set_priority) {
      setFormError("Proiority is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const resetReducerForm = () => {
    dispatchFlashCardData({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const addContent = () => {
    dispatchFlashCardData({
      type: "flash_card_items",
      value: [...flashCardData.flash_card_items, { front: "", back: "" }],
    });
  };

  const removeContent = (index) => {
    const updatedItems = flashCardData.flash_card_items.filter(
      (_, i) => i !== index
    );
    dispatchFlashCardData({
      type: "flash_card_items",
      value: updatedItems,
    });
  };

  const createFlashCard = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await ajaxCall(
        "/gamification/flashcard/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(flashCardData),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        toast.success("Flash Card Created Successfully");
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
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
              <SingleSelection
                value={flashCardData?.course}
                onChange={(val) => {
                  dispatchFlashCardData({
                    type: "course",
                    value: val,
                  });
                }}
                url="/courselistforpackage/"
                objKey={["Course_Title"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Flash Card Name"
                  value={flashCardData?.title}
                  onChange={(e) =>
                    dispatchFlashCardData({
                      type: "title",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Priority</label>
                <input
                  type="number"
                  placeholder="Flash Card Priority"
                  value={flashCardData?.set_priority}
                  onChange={(e) =>
                    dispatchFlashCardData({
                      type: "set_priority",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Flash Card Description"
                  value={flashCardData?.description}
                  onChange={(e) =>
                    dispatchFlashCardData({
                      type: "description",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {flashCardData.flash_card_items.map((item, index) => (
            <>
              <div className="col-xl-6" key={index}>
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`front-${index}`}>Front</label>
                    <div className="d-flex align-items-center">
                      <textarea
                        id={`front-${index}`}
                        cols="30"
                        rows="5"
                        type="text"
                        className="form-control"
                        placeholder="Front of Flash Card"
                        value={item.front}
                        onChange={(e) => {
                          const updatedItems = [
                            ...flashCardData.flash_card_items,
                          ];
                          updatedItems[index].front = e.target.value;
                          dispatchFlashCardData({
                            type: "flash_card_items",
                            value: updatedItems,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6" key={index}>
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`back-${index}`}>Back</label>
                    <div className="d-flex align-items-center">
                      <textarea
                        id={`back-${index}`}
                        cols="30"
                        rows="5"
                        type="text"
                        className="form-control"
                        placeholder="Back of Flash Card"
                        value={item.back}
                        onChange={(e) => {
                          const updatedItems = [
                            ...flashCardData.flash_card_items,
                          ];
                          updatedItems[index].back = e.target.value;
                          dispatchFlashCardData({
                            type: "flash_card_items",
                            value: updatedItems,
                          });
                        }}
                      />
                      {flashCardData.flash_card_items.length > 1 && (
                        <button
                          className="dashboard__small__btn__2 flash-card__remove__btn"
                          onClick={() => removeContent(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="col-xl-12">
            <button className="dashboard__small__btn__2" onClick={addContent}>
              + Front & Back
            </button>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              {formStatus.isError ? (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              ) : (
                <div className="text-success mb-2">{formStatus.errMsg}</div>
              )}
              <button className="default__button" onClick={createFlashCard}>
                Create Flash Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashCard;
