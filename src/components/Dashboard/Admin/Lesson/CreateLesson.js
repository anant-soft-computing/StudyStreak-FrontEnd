import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SelectSearch from "react-select-search";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";

const initialLessonData = {
  section: "",
  Lesson_Title: "",
  Lesson_Description: "",
  Lesson_Video: "",
  Lesson_Duration: "",
  lesson_assignment: [],
  sequence: 0,
  active: false,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreateLesson = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialLessonData;
  }
  return { ...state, [action.type]: action.value };
};

const validateForm = (createLessonData, setFormError) => {
  if (!createLessonData.Lesson_Title) {
    setFormError("Lesson Title is Required");
    return false;
  }
  if (!createLessonData.sequence) {
    setFormError("Lesson Sequence is Required");
    return false;
  }
  return true;
};

const CreateLesson = () => {
  const [createLessonData, dispatchCreateLesson] = useReducer(
    reducerCreateLesson,
    initialLessonData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const resetReducerForm = () => {
    dispatchCreateLesson({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateLesson({
        type: fieldName,
        value: val,
      });
      dispatchCreateLesson({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateLesson({
      type: fieldName,
      value: val,
    });
    dispatchCreateLesson({
      type: proFieldName,
      value: newValIds,
    });
  };

  const createLesson = async (e) => {
    e.preventDefault();
    if (!validateForm(createLessonData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const data = {
      section: createLessonData?.section,
      Lesson_Title: createLessonData?.Lesson_Title,
      Lesson_Description: createLessonData?.Lesson_Description,
      Lesson_Video: createLessonData?.Lesson_Video,
      Lesson_Duration: createLessonData?.Lesson_Duration,
      active: createLessonData?.active,
      lesson_assignment: createLessonData?.lesson_assignmentId,
      sequence: createLessonData?.sequence,
    };
    try {
      const response = await ajaxCall(
        "/lessoncreateview/",
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
        toast.success("Lesson Created Successfully");
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

  useEffect(() => {
    const fetchVideoLinks = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/list/lessons-videos/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          const result = response?.data?.files?.map((item) => ({
            name: item?.url?.slice(62),
            value: item?.url,
          }));
          setOptions(result);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoLinks();
  }, [authData?.accessToken]);

  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Section</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection
            value={createLessonData.section}
            onChange={(val) => {
              dispatchCreateLesson({
                type: "section",
                value: val,
              });
            }}
            url="/lessonsection-list/"
            objKey={["name"]}
            isSearch={true}
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Title</label>
            <input
              type="text"
              placeholder="Lesson Title"
              value={createLessonData.Lesson_Title}
              onChange={(e) => {
                dispatchCreateLesson({
                  type: "Lesson_Title",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Description</label>
            <input
              type="text"
              placeholder="Lesson Description"
              value={createLessonData.Lesson_Description}
              onChange={(e) => {
                dispatchCreateLesson({
                  type: "Lesson_Description",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Video</span>
        </div>
        <div className="dashboard__selector">
          <SelectSearch
            search
            options={options}
            className="select-search"
            value={createLessonData.Lesson_Video}
            onChange={(val) => {
              dispatchCreateLesson({
                type: "Lesson_Video",
                value: val,
              });
            }}
            placeholder={
              isLoading
                ? "Loading"
                : options?.length
                ? "Select Options"
                : "No Data Found"
            }
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Duration</label>
            <input
              type="text"
              placeholder="Lesson Duration"
              value={createLessonData.Lesson_Duration}
              onChange={(e) => {
                dispatchCreateLesson({
                  type: "Lesson_Duration",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__select__heading">
          <span>Assignment</span>
        </div>
        <div className="dashboard__selector">
          <SelectionBox
            value={createLessonData?.lesson_assignment}
            onSelect={addedSelectVal.bind(
              null,
              "lesson_assignment",
              "lesson_assignmentId",
              false
            )}
            url="/assignment-exam-list/"
            name="lesson_assignment"
            objKey={["name"]}
            isSearch={true}
            multiple={true}
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Sequence</label>
            <input
              type="number"
              placeholder="Lesson Sequence"
              value={createLessonData.sequence}
              onChange={(e) =>
                dispatchCreateLesson({
                  type: "sequence",
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="form__check">
        <label>Active</label>{" "}
        <input
          type="checkbox"
          value={createLessonData.active}
          onChange={(e) => {
            dispatchCreateLesson({
              type: "active",
              value: e.target.checked,
            });
          }}
        />
      </div>
      <div className="col-xl-12 mt-3">
        <div className="dashboard__form__button text-center mt-4">
          {formStatus.isError && (
            <div className="text-danger mb-2">{formStatus.errMsg}</div>
          )}
          {formStatus.isSubmitting ? (
            <Spinner animation="border" style={{ color: "#01579b" }} />
          ) : (
            <button
              className="default__button"
              onClick={createLesson}
              disabled={formStatus.isSubmitting}
            >
              Create Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLesson;
