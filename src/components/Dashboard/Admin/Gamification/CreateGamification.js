import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";
import SelectSearch from "react-select-search";

const initialGamificationData = {
  model: "Flash Card",
  object_id: 0,
  points: 0,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerGamification = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialGamificationData;
  }
  if (action.type === "liveClassType") {
    let defaultPoints = 10;
    if (action.value === "Regular Class") defaultPoints = 5;
    if (action.value === "Counselling") defaultPoints = 100;

    return { ...state, [action.type]: action.value, points: defaultPoints };
  }
  return { ...state, [action.type]: action.value };
};

const options = [
  "Flash Card",
  "Lesson",
  "Exam Block",
  "Full Length Test",
  "Practice Test",
  "Live Class",
];

const liveClassType = [
  "Regular Class",
  "Speaking-Practice",
  "One-To-One-Doubt-Solving",
  "Group-Doubt Solving",
  "Webinar",
  "Counselling",
  "Tutor Support",
];

const validateForm = (gamificationData, setFormError) => {
  if (!gamificationData.model) {
    setFormError("Content Type is Required");
    return false;
  }
  if (!gamificationData.points) {
    setFormError("Points is Required");
    return false;
  }
  return true;
};

const CreateGamification = ({ setActiveTab }) => {
  const [gamificationData, dispatchGamification] = useReducer(
    reducerGamification,
    initialGamificationData
  );
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allLiveClass, setAllLiveClass] = useState([]);
  const [liveClass, setLiveClass] = useState("Regular Class");

  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchGamification({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/gamification/objects/?model=Live Class",
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
          const classData = response?.data?.filter((item) => {
            const startTime = moment(item.start_time);
            const currentTime = moment();
            return (
              item.liveClassType === liveClass &&
              startTime.isSameOrAfter(currentTime)
            );
          });
          setAllLiveClass(classData);
          setNoData(classData.length === 0);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [liveClass, authData?.accessToken]);

  const createGamification = async (e) => {
    e.preventDefault();
    if (!validateForm(gamificationData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    const data = {
      model: gamificationData.model,
      object_id: gamificationData.object_id,
      points: gamificationData.points,
    }
    try {
      const response = await ajaxCall(
        "/gamification/",
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
        setActiveTab("View Gamification");
        toast.success("Gamification Created Successfully");
      } else if (response.status === 400) {
        toast.error(`This ${gamificationData.model} already exists.`);
      } else {
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
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Content Type</span>
            </div>
            <div className="dashboard__selector">
              <select
                className="form-select"
                aria-label="Default select example"
                value={gamificationData.model}
                onChange={(e) => {
                  dispatchGamification({
                    type: "model",
                    value: e.target.value,
                  });
                }}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {gamificationData.model === "Live Class" && (
            <div className="col-xl-6">
              <div className="dashboard__select__heading">
                <span>Live Class Type</span>
              </div>
              <div className="dashboard__selector">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={liveClass}
                  onChange={(e) => {
                    setLiveClass(e.target.value);
                    dispatchGamification({
                      type: "liveClassType",
                      value: e.target.value,
                    });
                  }}
                >
                  {liveClassType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {gamificationData.model === "Live Class" && (
            <div className="col-xl-6 mt-4">
              <div className="dashboard__select__heading">
                <span>Content</span>
              </div>
              <div className="dashboard__selector">
                <SelectSearch
                  search
                  options={
                    isLoading
                      ? [{ value: "", name: "Loading..." }]
                      : noData
                      ? [{ value: "", name: "No Data Available" }]
                      : allLiveClass.map((item) => ({
                          value: item.object_id,
                          name: item.rep_name,
                        }))
                  }
                  value={gamificationData.object_id}
                  onChange={(value) =>
                    dispatchGamification({
                      type: "object_id",
                      value,
                    })
                  }
                />
              </div>
            </div>
          )}
          {gamificationData.model !== "Live Class" && (
            <div className="col-xl-6 ">
              <div className="dashboard__select__heading">
                <span>Content</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={gamificationData?.object_id}
                  onChange={(val) => {
                    dispatchGamification({
                      type: "object_id",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url={`/gamification/objects/?model=${gamificationData.model}`}
                  objKey={["rep_name"]}
                />
              </div>
            </div>
          )}
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Points</label>
                <input
                  type="number"
                  placeholder="Gamification Points"
                  value={gamificationData.points}
                  onChange={(e) =>
                    dispatchGamification({
                      type: "points",
                      value: e.target.value,
                    })
                  }
                  disabled={gamificationData.model === "Live Class"}
                />
              </div>
            </div>
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
                  onClick={createGamification}
                  disabled={formStatus.isSubmitting}
                >
                  Create Gamification
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGamification;
