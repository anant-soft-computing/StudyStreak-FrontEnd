import React, { useReducer, useState } from "react";
import SingleSelection from "../../../UI/SingleSelect";

const initialBatchData = {
  package: "",
  batch_name: "",
  batch_startdate: "",
  batch_enddate: "",
  batch_start_timing: "",
  batch_end_timing: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerBatch = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialBatchData;
  }
  return { ...state, [action.type]: action.value };
};

const CreateBatch = () => {
  const [batchData, dispatchBatch] = useReducer(reducerBatch, initialBatchData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  console.log("--batchData---->",batchData)

  const validateForm = () => {
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
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const resetReducerForm = () => {
    dispatchBatch({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const createBatch = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;
    //API integration
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
                    type: "package",
                    value: val,
                  });
                }}
                url="/levelView/"
                objKey={["name"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Batch Name</label>
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
                <label for="#">Start Date</label>
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
                <label for="#">Start Time</label>
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
                <label for="#">End Date</label>
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
                <label for="#">End Time</label>
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
            <div className="dashboard__form__button">
              {formStatus.isError ? (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              ) : (
                <div className="text-success mb-2">{formStatus.errMsg}</div>
              )}
              <button className="default__button" onClick={createBatch}>
                Create Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBatch;
