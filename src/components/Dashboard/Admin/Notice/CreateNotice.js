import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialNoticData = {
  studentId: [],
  batchId: [],
  courseId: [],
  expiry_date: "",
  notice: "",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreateNotice = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialNoticData;
  }
  return { ...state, [action.type]: action.value };
};

const CreateNotice = ({ setActiveTab }) => {
  const [createNoticeData, dispatchCreateNotice] = useReducer(
    reducerCreateNotice,
    initialNoticData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeButton, setActiveButton] = useState("student");
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateNotice({ type: "reset" });
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    switch (buttonType) {
      case "student":
        dispatchCreateNotice({ type: "course", value: [] });
        dispatchCreateNotice({ type: "batch", value: [] });
        dispatchCreateNotice({ type: "courseId", value: [] });
        dispatchCreateNotice({ type: "batchId", value: [] });
        break;
      case "course":
        dispatchCreateNotice({ type: "student", value: [] });
        dispatchCreateNotice({ type: "batch", value: [] });
        dispatchCreateNotice({ type: "studentId", value: [] });
        dispatchCreateNotice({ type: "batchId", value: [] });
        break;
      case "batch":
        dispatchCreateNotice({ type: "student", value: [] });
        dispatchCreateNotice({ type: "course", value: [] });
        dispatchCreateNotice({ type: "studentId", value: [] });
        dispatchCreateNotice({ type: "courseId", value: [] });
        break;
      default:
        break;
    }
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateNotice({
        type: fieldName,
        value: val,
      });
      dispatchCreateNotice({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateNotice({
      type: fieldName,
      value: val,
    });
    dispatchCreateNotice({
      type: proFieldName,
      value: newValIds,
    });
  };

  const createNotice = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    const data = {
      student: createNoticeData.studentId,
      batch: createNoticeData.batchId,
      course: createNoticeData.courseId,
      expiry_date: createNoticeData.expiry_date,
      notice: createNoticeData.notice,
    };
    try {
      const response = await ajaxCall(
        "/noticeboard/",
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
        setActiveTab("View Notice");
        toast.success("Notice Created Successfully");
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
            activeButton === "student" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("student")}
        >
          Student
        </button>
        <button
          className={`default__button ${
            activeButton === "course" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("course")}
        >
          Course
        </button>
        <button
          className={`default__button ${
            activeButton === "batch" ? "active bg-success" : ""
          }`}
          onClick={() => handleButtonClick("batch")}
        >
          Batch
        </button>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            {activeButton === "student" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Student</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createNoticeData?.student}
                    onSelect={addedSelectVal.bind(
                      null,
                      "student",
                      "studentId",
                      false
                    )}
                    url="/student-list/"
                    name="full_name"
                    objKey={["full_name"]}
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
                    value={createNoticeData?.course}
                    onSelect={addedSelectVal.bind(
                      null,
                      "course",
                      "courseId",
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
            {activeButton === "batch" && (
              <div className="col-xl-6">
                <div className="dashboard__select__heading">
                  <span>Batch</span>
                </div>
                <div className="dashboard__selector">
                  <SelectionBox
                    value={createNoticeData?.batch}
                    onSelect={addedSelectVal.bind(
                      null,
                      "batch",
                      "batchId",
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
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    placeholder="expiry date"
                    value={createNoticeData?.expiry_date}
                    onChange={(e) =>
                      dispatchCreateNotice({
                        type: "expiry_date",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Notice</label>
                <textarea
                  type="text"
                  placeholder="Notice"
                  value={createNoticeData?.notice}
                  onChange={(e) =>
                    dispatchCreateNotice({
                      type: "notice",
                      value: e.target.value,
                    })
                  }
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
                  onClick={createNotice}
                  disabled={formStatus.isSubmitting}
                >
                  Create Notice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNotice;
