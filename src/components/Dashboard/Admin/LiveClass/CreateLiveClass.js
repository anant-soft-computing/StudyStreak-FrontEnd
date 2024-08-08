import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import moment from "moment";

const initialLiveClassData = {
  liveclasstype: "",
  select_batch: "",
  topic: "",
  agenda: "",
  start_time: "",
  end_time: "",
  registration_limit: "",
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
  if (!createLiveClassData.end_time) {
    setFormError("End Date & Time is Required");
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
      topic: createLiveClassData.topic,
      agenda: createLiveClassData.agenda,
      select_batch: createLiveClassData.select_batch,
      liveclasstype: createLiveClassData.liveclasstype,
      registration_limit: createLiveClassData.registration_limit,
      start_time: moment(createLiveClassData.start_time).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      end_time: moment(createLiveClassData.end_time).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      duration: moment(createLiveClassData.end_time).diff(
        moment(createLiveClassData.start_time),
        "minutes"
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
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Start Date & Time (UTC)</label>
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
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>End Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={createLiveClassData.end_time}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: "end_time",
                      value: e.target.value,
                    });
                  }}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
          </div>
          {createLiveClassData.liveclasstype >= 2 &&
            createLiveClassData.liveclasstype <= 7 && (
              <div className="col-xl-6">
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
  );
};

export default CreateLiveClass;
