import moment from "moment";
import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import SingleSelection from "../../../UI/SingleSelect";

const initialRLCD = {
  select_batch: "",
  liveclasstype: "",
  topic: "",
  agenda: "",
  start_time: "",
  registration_limit: "",
  recurrence_type: 1,
  weekly_days: "",
  monthly_day: "",
  monthly_week: "",
  monthly_week_day: "",
  repeat_interval: 1,
  end_date_time: "",
  end_times: 1,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerRLCD = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialRLCD;
  }
  return { ...state, [action.type]: action.value };
};

const validateForm = (cRLD, setFormError) => {
  if (!cRLD.liveclasstype) {
    setFormError("Live Class Type is Required");
    return false;
  }
  if (!cRLD.topic) {
    setFormError("Meeting Title is Required");
    return false;
  }
  if (!cRLD.agenda) {
    setFormError("Meeting Description Required");
    return false;
  }
  if (!cRLD.start_time) {
    setFormError("Start Date & Time is Required");
    return false;
  }
  return true;
};

const CreateRecurrenceLiveClass = ({ setActiveTab }) => {
  const [createRLCData, dispatchCRLD] = useReducer(reducerRLCD, initialRLCD);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCRLD({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createRecurrenceLiveClass = async (e) => {
    e.preventDefault();
    if (!validateForm(createRLCData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const data = {
      topic: createRLCData.topic,
      agenda: createRLCData.agenda,
      select_batch: createRLCData.select_batch,
      liveclasstype: createRLCData.liveclasstype,
      registration_limit: createRLCData.registration_limit,
      duration: moment(createRLCData.end_date_time).diff(
        moment(createRLCData.start_time),
        "minutes"
      ),
      timezone: "Asia/Kolkata",
      recurrence: {
        end_date_time: moment(createRLCData.end_date_time).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        end_times: createRLCData.end_times,
        monthly_day: createRLCData.monthly_day,
        monthly_week: createRLCData.monthly_week,
        monthly_week_day: createRLCData.monthly_week_day,
        repeat_interval: createRLCData.repeat_interval,
        type: createRLCData.recurrence_type,
        weekly_days: createRLCData.weekly_days,
      },
      start_time: moment(createRLCData.start_time).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    };

    try {
      const response = await ajaxCall(
        "/liveclass_create_view/",
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
        setActiveTab("View LiveClass");
        toast.success("Recurrence Live Class Created Successfully");
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
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Live Class Type</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createRLCData.liveclasstype}
                onChange={(val) => {
                  dispatchCRLD({
                    type: "liveclasstype",
                    value: val,
                  });
                }}
                isSearch={true}
                url="/live_class_type_list_view/"
                objKey={["name"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Batch</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createRLCData.select_batch}
                onChange={(val) => {
                  dispatchCRLD({
                    type: "select_batch",
                    value: val,
                  });
                }}
                isSearch={true}
                url="/batchview/"
                objKey={["batch_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6 mt-3">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Meeting Title</label>
                <input
                  type="text"
                  placeholder="Meeting Title"
                  value={createRLCData.topic}
                  onChange={(e) => {
                    dispatchCRLD({
                      type: "topic",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-3">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Meeting Description</label>
                <input
                  type="text"
                  placeholder="Meeting Description"
                  value={createRLCData.agenda}
                  onChange={(e) => {
                    dispatchCRLD({
                      type: "agenda",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Start Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={createRLCData.start_time}
                  onChange={(e) => {
                    dispatchCRLD({
                      type: "start_time",
                      value: e.target.value,
                    });
                  }}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>End Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={createRLCData.end_date_time}
                  onChange={(e) =>
                    dispatchCRLD({
                      type: "end_date_time",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {createRLCData.liveclasstype >= 2 &&
            createRLCData.liveclasstype <= 7 && (
              <div className="col-xl-6">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label>Registration Limit</label>
                    <input
                      type="number"
                      placeholder="Registration Limit"
                      value={createRLCData.registration_limit}
                      onChange={(e) => {
                        dispatchCRLD({
                          type: "registration_limit",
                          value: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Recurrence</span>
            </div>
            <div className="dashboard__selector">
              <select
                className="form-select"
                aria-label="Default select example"
                value={createRLCData.recurrence_type}
                onChange={(e) =>
                  dispatchCRLD({
                    type: "recurrence_type",
                    value: parseInt(e.target.value),
                  })
                }
              >
                <option value={1}>Daily</option>
                <option value={2}>Weekly</option>
                <option value={3}>Monthly</option>
              </select>
            </div>
          </div>
          {createRLCData.recurrence_type === 2 && (
            <div className="col-xl-6">
              <div className="dashboard__select__heading">
                <span>Weekly Days</span>
              </div>
              <div className="dashboard__selector">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={createRLCData.weekly_days}
                  onChange={(e) =>
                    dispatchCRLD({
                      type: "weekly_days",
                      value: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={1}>Sunday</option>
                  <option value={2}>Monday</option>
                  <option value={3}>Tuesday</option>
                  <option value={4}>Wednesday</option>
                  <option value={5}>Thursday</option>
                  <option value={6}>Friday</option>
                  <option value={7}>Saturday</option>
                </select>
              </div>
            </div>
          )}
          {createRLCData.recurrence_type === 3 && (
            <>
              <div className="col-xl-6">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label>Monthly Day</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      placeholder="Monthly Day"
                      value={createRLCData.monthly_day}
                      onChange={(e) =>
                        dispatchCRLD({
                          type: "monthly_day",
                          value: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Monthly Week</span>
                </div>
                <div className="dashboard__selector">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={createRLCData.monthly_week}
                    onChange={(e) =>
                      dispatchCRLD({
                        type: "monthly_week",
                        value: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={-1}>Last Week Of The Month</option>
                    <option value={1}>First Week Of The Month</option>
                    <option value={2}>Second Week Of The Month</option>
                    <option value={3}>Third Week Of The Month</option>
                    <option value={4}>Fourth Week Of The Month</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Monthly Week Day</span>
                </div>
                <div className="dashboard__selector">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={createRLCData.monthly_week_day}
                    onChange={(e) =>
                      dispatchCRLD({
                        type: "monthly_week_day",
                        value: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={1}>Sunday</option>
                    <option value={2}>Monday</option>
                    <option value={3}>Tuesday</option>
                    <option value={4}>Wednesday</option>
                    <option value={5}>Thursday</option>
                    <option value={6}>Friday</option>
                    <option value={7}>Saturday</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div
            className={
              createRLCData.recurrence_type === 2 ||
              createRLCData.recurrence_type === 3
                ? "col-xl-6 mt-3"
                : "col-xl-6"
            }
          >
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Repeat Interval</label>
                <input
                  type="number"
                  placeholder="Repeat interval"
                  value={createRLCData.repeat_interval}
                  onChange={(e) =>
                    dispatchCRLD({
                      type: "repeat_interval",
                      value: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div
            className={
              createRLCData.recurrence_type === 2 ||
              createRLCData.recurrence_type === 3
                ? "col-xl-6 mt-3"
                : "col-xl-6"
            }
          >
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>End Times</label>
                <input
                  type="number"
                  placeholder="End Times"
                  value={createRLCData.end_times}
                  onChange={(e) =>
                    dispatchCRLD({
                      type: "end_times",
                      value: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-12 mt-3">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Loading
                  color="primary"
                  text="Creating Recurrence Live Class..."
                />
              ) : (
                <button
                  className="default__button"
                  onClick={createRecurrenceLiveClass}
                  disabled={formStatus.isSubmitting}
                >
                  Create Recurrence Live Class
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecurrenceLiveClass;
