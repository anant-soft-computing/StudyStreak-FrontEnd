import React, { useReducer, useState } from "react";
import SingleSelection from "../../../UI/SingleSelect";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";

const initialNoticData = {
  student: "",
  batch: "",
  course: "",
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
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateNotice({ type: "reset" });
  };

  const createNotice = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
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
          body: JSON.stringify(createNoticeData),
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
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Student</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createNoticeData?.student}
                onChange={(val) => {
                  dispatchCreateNotice({
                    type: "student",
                    value: val,
                  });
                }}
                url="/student-list/"
                objKey={["full_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Batch</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createNoticeData?.batch}
                onChange={(val) => {
                  dispatchCreateNotice({
                    type: "batch",
                    value: val,
                  });
                }}
                url="/batchview/"
                objKey={["batch_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Course</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createNoticeData?.course}
                onChange={(val) => {
                  dispatchCreateNotice({
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
              <Loading color="primary" text="Creating Notice..." />
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
  );
};

export default CreateNotice;
