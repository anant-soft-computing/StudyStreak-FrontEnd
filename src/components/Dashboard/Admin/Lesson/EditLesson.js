import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SelectSearch from "react-select-search";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";

const initialLessonData = {
  section: "",
  Lesson_Title: "",
  Lesson_Description: "",
  Lesson_Video: "",
  Lesson_Duration: "",
  active: false,
};

const reducerEditLesson = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialLessonData;
  }
  return { ...state, [action.type]: action.value };
};

const EditLesson = ({ lesson, onClose, setRefresh }) => {
  const [editLessonData, dispatchEditLesson] = useReducer(
    reducerEditLesson,
    initialLessonData
  );
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (lesson) {
      dispatchEditLesson({ type: "reset", payload: lesson });
    }
  }, [lesson]);

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
        console.log("API Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoLinks();
  }, [authData?.accessToken]);

  const handleLessonUpdate = async (e) => {
    e.preventDefault();
    const editData = {
      section: editLessonData.section,
      Lesson_Title: editLessonData.Lesson_Title,
      Lesson_Description: editLessonData.Lesson_Description,
      Lesson_Video: encodeURI(editLessonData.Lesson_Video),
      Lesson_Duration: editLessonData.Lesson_Duration,
      active: editLessonData.active,
    };
    try {
      const response = await ajaxCall(
        `/lesson-edit/${lesson.id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "PATCH",
          body: JSON.stringify(editData),
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Lesson updated successfully");
        setRefresh((prev) => !prev);
        onClose();
      } else {
        toast.error("Failed to update the lesson");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="row">
      <div>
        <div className="dashboard__select__heading">
          <span>Section</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection
            value={editLessonData.section}
            onChange={(val) => {
              dispatchEditLesson({ type: "section", value: val });
            }}
            url="/lessonsection-list/"
            objKey={["name"]}
            isSearch={true}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="dashboard__select__heading">
          <span>Video</span>
        </div>
        <div className="dashboard__select__heading">
          <span>{lesson?.Lesson_Video}</span>
        </div>
        <div className="dashboard__selector">
          <SelectSearch
            search
            options={options}
            className="select-search"
            value={editLessonData.Lesson_Video}
            onChange={(val) => {
              dispatchEditLesson({
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
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-3">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Title</label>
            <input
              type="text"
              placeholder="Lesson Title"
              value={editLessonData.Lesson_Title}
              onChange={(e) => {
                dispatchEditLesson({
                  type: "Lesson_Title",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-3">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Description</label>
            <input
              type="text"
              placeholder="Lesson Description"
              value={editLessonData.Lesson_Description}
              onChange={(e) => {
                dispatchEditLesson({
                  type: "Lesson_Description",
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
            <label>Duration</label>
            <input
              type="text"
              placeholder="Lesson Duration"
              value={editLessonData.Lesson_Duration}
              onChange={(e) => {
                dispatchEditLesson({
                  type: "Lesson_Duration",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="form__check d-flex gap-2">
        <label>Active</label>
        <input
          type="checkbox"
          checked={editLessonData.active}
          onChange={(e) => {
            dispatchEditLesson({
              type: "active",
              value: e.target.checked,
            });
          }}
        />
      </div>
      <div className="mt-4 d-flex justify-content-end align-items-center gap-2">
        <button className="btn btn-success" onClick={handleLessonUpdate}>
          Save
        </button>
        <button className="btn btn-danger" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditLesson;
