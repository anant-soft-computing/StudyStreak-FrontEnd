import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";

const initialBatchData = {
  add_package: "",
  batch_name: "",
  batch_startdate: "",
  batch_enddate: "",
  batch_start_timing: "",
  batch_end_timing: "",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerBatch = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialBatchData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (batchData, setFormError) => {
  if (!batchData.add_package) {
    setFormError("Package is Required");
    return false;
  }
  if (!batchData.batch_name) {
    setFormError("Batch Name is Required");
    return false;
  }
  if (!batchData.batch_startdate) {
    setFormError("Start Date is Required");
    return false;
  }
  if (!batchData.batch_enddate) {
    setFormError("End Date is Required");
    return false;
  }
  if (!batchData.batch_start_timing) {
    setFormError("Start Time is Required");
    return false;
  }
  if (!batchData.batch_end_timing) {
    setFormError("End Time is Required");
    return false;
  }
  return true;
};

const CreateBatch = ({ setActiveTab }) => {
  const [batchData, dispatchBatch] = useReducer(reducerBatch, initialBatchData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchBatch({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createBatch = async (e) => {
    e.preventDefault();
    if (!validateForm(batchData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const response = await ajaxCall(
        "/create-batch/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(batchData),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Batch");
        toast.success("Batch Created Successfully");
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
              <span>Package</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={batchData?.batch}
                onChange={(val) => {
                  dispatchBatch({
                    type: "add_package",
                    value: val,
                  });
                }}
                isSearch={true}
                url="/packagelistview/"
                objKey={["package_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Batch Name</label>
                <input
                  type="text"
                  placeholder="Batch Name"
                  value={batchData?.batch_name}
                  onChange={(e) => {
                    dispatchBatch({
                      type: "batch_name",
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
                <label>Start Date</label>
                <input
                  type="date"
                  value={batchData?.batch_startdate}
                  onChange={(e) => {
                    dispatchBatch({
                      type: "batch_startdate",
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
                <label>Start Time</label>
                <input
                  type="time"
                  value={batchData?.batch_start_timing}
                  onChange={(e) => {
                    dispatchBatch({
                      type: "batch_start_timing",
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
                <label>End Date</label>
                <input
                  type="date"
                  value={batchData?.batch_enddate}
                  onChange={(e) => {
                    dispatchBatch({
                      type: "batch_enddate",
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
                <label>End Time</label>
                <input
                  type="time"
                  value={batchData?.batch_end_timing}
                  onChange={(e) => {
                    dispatchBatch({
                      type: "batch_end_timing",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
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
                  onClick={createBatch}
                  disabled={formStatus.isSubmitting}
                >
                  Create Batch
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBatch;
