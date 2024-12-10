import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import SelectionBox from "../../../UI/SelectionBox";

const initialLiveClassData = {
  liveclasstype: "",
  select_batch: [],
  select_batchId: [],
  select_course: [],
  select_courseId: [],
  meeting_title: "",
  meeting_description: "",
  start_time: "",
  end_time: "",
  registration_limit: null,
  attachments: [{ attachment: null, file_name: "" }],
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
  if (!createLiveClassData.meeting_title) {
    setFormError("Meeting Title is Required");
    return false;
  }
  if (!createLiveClassData.meeting_description) {
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
  if (
    moment(createLiveClassData.end_time).isBefore(
      createLiveClassData.start_time
    )
  ) {
    setFormError("End Time Must Be After Start Time");
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
  const [activeButton, setActiveButton] = useState("batch");
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateLiveClass({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    switch (buttonType) {
      case "course":
        dispatchCreateLiveClass({ type: "select_batch", value: [] });
        dispatchCreateLiveClass({ type: "select_batchId", value: [] });
        break;
      case "batch":
        dispatchCreateLiveClass({ type: "select_course", value: [] });
        dispatchCreateLiveClass({ type: "select_courseId", value: [] });
        break;
      default:
        break;
    }
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateLiveClass({
        type: fieldName,
        value: val,
      });
      dispatchCreateLiveClass({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateLiveClass({
      type: fieldName,
      value: val,
    });
    dispatchCreateLiveClass({
      type: proFieldName,
      value: newValIds,
    });
  };

  const addContent = () => {
    const updatedAttachments = [
      ...createLiveClassData.attachments,
      { attachment: null, file_name: "" },
    ];
    dispatchCreateLiveClass({
      type: "attachments",
      value: updatedAttachments,
    });
  };

  const removeContent = (index) => {
    const updatedAttachments = createLiveClassData.attachments.filter(
      (_, i) => i !== index
    );
    dispatchCreateLiveClass({
      type: "attachments",
      value: updatedAttachments,
    });
  };

  const createLiveClass = async (e) => {
    e.preventDefault();
    const currentTime = moment();
    const selectedStartTime = moment(createLiveClassData.start_time);
    const timeDiffInHours = selectedStartTime.diff(currentTime, "hours");

    if (timeDiffInHours < 6) {
      setFormError(
        "Please Select A Start Time At Least 6 Hours From The Current Time."
      );
      return;
    }
    if (!validateForm(createLiveClassData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const data = {
      meeting_title: createLiveClassData.meeting_title,
      meeting_description: createLiveClassData.meeting_description,
      select_batch: createLiveClassData.select_batchId,
      select_course: createLiveClassData.select_courseId,
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
      settings: {
        auto_recording: "cloud",
      },
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
        const liveClassId = response?.data?.id;

        const formData = new FormData();

        // Append LiveClass Attachments
        createLiveClassData.attachments.forEach((item, index) => {
          if (item.attachment) {
            formData.append(`attachments[${index}]attachment`, item.attachment);
          }
          formData.append(`attachments[${index}]file_name`, item.file_name);
        });

        const attachmentResponse = await ajaxCall(
          `/liveclass/attachment/${liveClassId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
            },
            method: "POST",
            body: formData,
          },
          8000
        );

        if (attachmentResponse.status === 201) {
          resetReducerForm();
          setActiveTab("View LiveClass");
          toast.success("Live Class Created Successfully");
        } else {
          toast.error("Some Problem Occurred. Please try again.");
        }
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
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <button
          className={`default__button ${
            activeButton === "batch" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("batch")}
        >
          Batch
        </button>
        <button
          className={`default__button ${
            activeButton === "course" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("course")}
        >
          Course
        </button>
      </div>
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
            {activeButton === "batch" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Batch</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createLiveClassData?.select_batch}
                    onSelect={addedSelectVal.bind(
                      null,
                      "select_batch",
                      "select_batchId",
                      false
                    )}
                    url="/batchview/"
                    name="batch_name"
                    objKey={["batch_name"]}
                    isSearch={true}
                    multiple={true}
                  />
                </div>
              </div>
            )}
            {activeButton === "course" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Course</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createLiveClassData?.select_course}
                    onSelect={addedSelectVal.bind(
                      null,
                      "select_course",
                      "select_courseId",
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
            )}
            <div className="col-xl-6 mt-3">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Meeting Title</label>
                  <input
                    type="text"
                    placeholder="Meeting Title"
                    value={createLiveClassData.meeting_title}
                    onChange={(e) => {
                      dispatchCreateLiveClass({
                        type: "meeting_title",
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
                    value={createLiveClassData.meeting_description}
                    onChange={(e) => {
                      dispatchCreateLiveClass({
                        type: "meeting_description",
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
            {createLiveClassData.attachments.map((_, index) => (
              <div className="row" key={index}>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor={`attachment-${index}`}>Document</label>
                      <div className="d-flex align-items-center">
                        <input
                          id={`attachment-${index}`}
                          type="file"
                          className="form-control"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const updatedAttachments = [
                              ...createLiveClassData.attachments,
                            ];
                            updatedAttachments[index].attachment = file;
                            dispatchCreateLiveClass({
                              type: "attachments",
                              value: updatedAttachments,
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
                      <label htmlFor={`description-${index}`}>
                        Description
                      </label>
                      <div className="d-flex align-items-center">
                        <input
                          id={`description-${index}`}
                          type="text"
                          className="form-control"
                          placeholder="Description of Live Class Attachment"
                          value={
                            createLiveClassData.attachments[index].file_name
                          }
                          onChange={(e) => {
                            const updatedAttachments = [
                              ...createLiveClassData.attachments,
                            ];
                            updatedAttachments[index].file_name =
                              e.target.value;
                            dispatchCreateLiveClass({
                              type: "attachments",
                              value: updatedAttachments,
                            });
                          }}
                        />
                        {createLiveClassData.attachments.length > 1 && (
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
                + Attachments
              </button>
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
