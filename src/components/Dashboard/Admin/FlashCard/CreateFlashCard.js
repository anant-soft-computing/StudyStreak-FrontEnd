import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialFlashCardData = {
  course: [],
  courseIds: [],
  title: "",
  description: "",
  flash_card_items: [{ front: "", back: "" }],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const validateForm = (flashCardData, setFormError) => {
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
  return true;
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

const CreateFlashCard = ({ setActiveTab }) => {
  const [flashCardData, dispatchFlashCardData] = useReducer(
    reducerFlashCard,
    initialFlashCardData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchFlashCardData({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
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
    if (!validateForm(flashCardData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    const data = {
      course: flashCardData.course.map((item) => item.id),
      title: flashCardData.title,
      description: flashCardData.description,
      flash_card_items: flashCardData.flash_card_items,
    };
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
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View FlashCard");
        toast.success("Flash Card Created Successfully");
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

  const addedSelectVal = (field, proField, isSingle, val) => {
    dispatchFlashCardData({ type: field, value: val });
    dispatchFlashCardData({
      type: proField,
      value: val.map((item) => item.id),
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
                value={flashCardData.course}
                onSelect={addedSelectVal.bind(
                  null,
                  "course",
                  "courseIds",
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
          <div className="row">
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
                            <i className="icofont-ui-delete" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="col-xl-12">
            <button className="dashboard__small__btn__2" onClick={addContent}>
              + Front & Back
            </button>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Spinner animation="border" style={{ color: "#01579b" }} />
              ) : (
                <button
                  className="default__button"
                  onClick={createFlashCard}
                  disabled={formStatus.isSubmitting}
                >
                  Create Flash Card
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashCard;
