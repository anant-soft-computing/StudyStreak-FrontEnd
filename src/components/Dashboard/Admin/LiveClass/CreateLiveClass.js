import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import moment from "moment";

const initialLiveClassData = {
  select_batch: "",
  liveclasstype: "",
  topic: "",
  agenda: "",
  start_time: "",
  end_time: "",
  registration_limit: 0,
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

const reducerCreateLiveClass = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialLiveClassData;
  }
  return { ...state, [action.type]: action.value };
};

const validateForm = (createLiveClassData, setFormError) => {
  if (!createLiveClassData.liveclasstype) {
    setFormError("Live Class Type is Required");
    return false;
  }
  if (!createLiveClassData.topic) {
    setFormError("Meeting Title is Required");
    return false;
  }
  if (!createLiveClassData.agenda) {
    setFormError("Meeting Description Required");
    return false;
  }
  if (!createLiveClassData.start_time) {
    setFormError("Start Date & Time is Required");
    return false;
  }
  return true;
};

const CreateLiveClass = ({ setActiveTab }) => {
  const [createLiveClassData, dispatchCreateLiveClass] = useReducer(
    reducerCreateLiveClass,
    initialLiveClassData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateLiveClass({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createLiveClass = async (e) => {
    e.preventDefault();
    if (!validateForm(createLiveClassData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const data = {
      select_batch: createLiveClassData.select_batch,
      liveclasstype: createLiveClassData.liveclasstype,
      agenda: createLiveClassData.agenda,
      duration: moment(createLiveClassData.end_date_time).diff(
        moment(createLiveClassData.start_time),
        "minutes"
      ),
      timezone: "Asia/Kolkata",
      recurrence: {
        end_date_time: moment(createLiveClassData.end_date_time).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        end_times: createLiveClassData.end_times,
        monthly_day: createLiveClassData.monthly_day,
        monthly_week: createLiveClassData.monthly_week,
        monthly_week_day: createLiveClassData.monthly_week_day,
        repeat_interval: createLiveClassData.repeat_interval,
        type: createLiveClassData.recurrence_type,
        weekly_days: createLiveClassData.weekly_days,
      },
      start_time: moment(createLiveClassData.start_time).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      topic: createLiveClassData.topic,
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
        toast.success("Live Class Created Successfully");
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
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-6">
              <div className="dashboard__select__heading">
                <span>Live Class Type</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createLiveClassData.liveclasstype}
                  onChange={(val) => {
                    dispatchCreateLiveClass({
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
                  value={createLiveClassData.select_batch}
                  onChange={(val) => {
                    dispatchCreateLiveClass({
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
                    value={createLiveClassData.topic}
                    onChange={(e) => {
                      dispatchCreateLiveClass({
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
                  <label>Start Date & Time</label>
                  <input
                    type="datetime-local"
                    value={createLiveClassData.start_time}
                    onChange={(e) => {
                      dispatchCreateLiveClass({
                        type: "start_time",
                        value: e.target.value,
                      });
                    }}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>
            </div>
            {(createLiveClassData.liveclasstype === 2 ||
              createLiveClassData.liveclasstype === 4) && (
              <div className="col-xl-6 mt-3">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label>Registration Limit</label>
                    <input
                      type="number"
                      placeholder="Registration Limit"
                      value={createLiveClassData.registration_limit}
                      onChange={(e) => {
                        dispatchCreateLiveClass({
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
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Meeting Description</label>
                  <input
                    type="text"
                    placeholder="Meeting Description"
                    value={createLiveClassData.agenda}
                    onChange={(e) => {
                      dispatchCreateLiveClass({
                        type: "agenda",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="dashboard__select__heading">
                <span>Recurrence</span>
              </div>
              <div className="dashboard__selector">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={createLiveClassData.recurrence_type}
                  onChange={(e) =>
                    dispatchCreateLiveClass({
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

            {createLiveClassData.recurrence_type === 2 && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Weekly Days</span>
                </div>
                <div className="dashboard__selector">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={createLiveClassData.weekly_days}
                    onChange={(e) =>
                      dispatchCreateLiveClass({
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

            {createLiveClassData.recurrence_type === 3 && (
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
                        value={createLiveClassData.monthly_day}
                        onChange={(e) =>
                          dispatchCreateLiveClass({
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
                      value={createLiveClassData.monthly_week}
                      onChange={(e) =>
                        dispatchCreateLiveClass({
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
                      value={createLiveClassData.monthly_week_day}
                      onChange={(e) =>
                        dispatchCreateLiveClass({
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

            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Repeat Interval</label>
                  <input
                    type="number"
                    placeholder="Repeat interval"
                    value={createLiveClassData.repeat_interval}
                    onChange={(e) =>
                      dispatchCreateLiveClass({
                        type: "repeat_interval",
                        value: parseInt(e.target.value),
                      })
                    }
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
                    value={createLiveClassData.end_date_time}
                    onChange={(e) =>
                      dispatchCreateLiveClass({
                        type: "end_date_time",
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
                  <label>End Times</label>
                  <input
                    type="number"
                    placeholder="End Times"
                    value={createLiveClassData.end_times}
                    onChange={(e) =>
                      dispatchCreateLiveClass({
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
                  <Loading color="primary" text="Creating Live Class..." />
                ) : (
                  <button
                    className="default__button"
                    onClick={createLiveClass}
                    disabled={formStatus.isSubmitting}
                  >
                    Create Live Class
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLiveClass;
