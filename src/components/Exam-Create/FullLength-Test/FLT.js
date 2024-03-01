import React, { useEffect, useReducer, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";

const intialFLTData = {
  Name: "",
  exam_test: "Full Length",
  Reading: [],
  Writing: [],
  Listening: [],
  Speaking: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};
const reducerFLT = (state, action) => {
  if (action.type === "reset") {
    return action.payload || intialFLTData;
  }
  return { ...state, [action.type]: action.value };
};

const FLT = () => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [createFLT, dispatchFLT] = useReducer(reducerFLT, intialFLTData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const resetReducerForm = () => {
    dispatchFLT({
      type: "reset",
    });
  };

  const getExams = async () => {
    try {
      const response = await ajaxCall(
        "/moduleListView",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        const { data } = response;
        const pt = data.filter(({ exam_test }) => exam_test === "Practice");
        const updatedExams = {
          Reading: pt.filter(({ Reading }) => Reading.length > 0),
          Writing: pt.filter(({ Writing }) => Writing.length > 0),
          Listening: pt.filter(({ Listening }) => Listening.length > 0),
          Speaking: pt.filter(({ Speaking }) => Speaking.length > 0),
        };
        setExams(updatedExams);
      } else {
        console.error("Error fetching exams");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const validateForm = () => {
    if (!createFLT.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (!createFLT.Reading.length > 0) {
      setFormError("Please Choose at least one Reading Practice Test");
      return false;
    }
    if (!createFLT.Writing.length > 0) {
      setFormError("Please Choose at least one Writing Practice Test");
      return false;
    }
    if (!createFLT.Listening.length > 0) {
      setFormError("Please Choose at least one Listening Practice Test");
      return false;
    }
    if (!createFLT.Speaking.length > 0) {
      setFormError("Please Choose at least one Speaking Practice Test");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createFullLengthTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = {
        Name: createFLT.Name,
        exam_test: createFLT.exam_test,
        Reading: createFLT.Reading,
        Writing: createFLT.Writing,
        Listening: createFLT.Listening,
        Speaking: createFLT.Speaking,
      };
      const response = await ajaxCall(
        "/moduleListView/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        toast.success("Full Length Test Create Successfully");
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  const rowSelection = "multiple";

  const handleRowSelection = (type) => (event) => {
    const selectedNodes = event.api?.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node?.data?.id);

    dispatchFLT({
      type,
      value: selectedIds,
    });
  };

  const gridOptions = (rowData, handleRowSelection) => ({
    rowData,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      { headerCheckboxSelection: true, checkboxSelection: true },
      { headerName: "Exam Name", field: "Name", filter: true },
      { headerName: "Exam Type", field: "exam_test", filter: true },
    ],
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  });

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="container">
          <div className="row">
            <div
              className="col-xl-8 col-lg-8 col-md-12 col-12"
              style={{ width: "-webkit-fill-available" }}
            >
              <div className="create__course__accordion__wraper">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        FLT Details
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="become__instructor__form">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Full Length Test Name</label>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    value={createFLT.Name}
                                    onChange={(e) =>
                                      dispatchFLT({
                                        type: "Name",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        FLT Content
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="become__instructor__form">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>(1) Reading : </label>
                                  <div
                                    className="ag-theme-alpine"
                                    style={{ width: "63%" }}
                                  >
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Reading,
                                        handleRowSelection("Reading")
                                      )}
                                      rowSelection={rowSelection}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(2) Writing : </label>
                                  <div
                                    className="ag-theme-alpine"
                                    style={{ width: "63%" }}
                                  >
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Writing,
                                        handleRowSelection("Writing")
                                      )}
                                      rowSelection={rowSelection}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(3) Listening : </label>
                                  <div
                                    className="ag-theme-alpine"
                                    style={{ width: "63%" }}
                                  >
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Listening,
                                        handleRowSelection("Listening")
                                      )}
                                      rowSelection={rowSelection}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(4) Speaking : </label>
                                  <div
                                    className="ag-theme-alpine"
                                    style={{ width: "63%" }}
                                  >
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Speaking,
                                        handleRowSelection("Speaking")
                                      )}
                                      rowSelection={rowSelection}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create__course__bottom__button">
                {formStatus.isError ? (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                ) : (
                  <div className="text-success mb-2">{formStatus.errMsg}</div>
                )}
                <button
                  className="default__button"
                  onClick={createFullLengthTest}
                >
                  Create FLT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FLT;
