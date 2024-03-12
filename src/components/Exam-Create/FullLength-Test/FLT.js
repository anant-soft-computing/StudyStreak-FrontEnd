import React, { useEffect, useReducer, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";

const intialFLTData = {
  name: "",
  difficulty_level: "Easy",
  Reading: "",
  Writing: "",
  Listening: "",
  Speaking: "",
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

  useEffect(() => {
    (async () => {
      try {
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
            method: "GET",
          },
          8000
        );

        if (response.status === 200) {
          const { data } = response;
          const updatedExams = {
            Reading: data.filter(({ Reading }) => Reading.length > 0),
            Writing: data.filter(({ Writing }) => Writing.length > 0),
            Listening: data.filter(({ Listening }) => Listening.length > 0),
            Speaking: data.filter(({ Speaking }) => Speaking.length > 0),
          };
          setExams(updatedExams);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const validateForm = () => {
    if (!createFLT.name) {
      setFormError("Name is Required");
      return false;
    }
    if (!createFLT.Reading) {
      setFormError("Please Choose a Reading Practice Test");
      return false;
    }
    if (!createFLT.Writing) {
      setFormError("Please Choose a Writing Practice Test");
      return false;
    }
    if (!createFLT.Listening) {
      setFormError("Please Choose a Listening Practice Test");
      return false;
    }
    if (!createFLT.Speaking) {
      setFormError("Please Choose a Speaking Practice Test");
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
        name: createFLT.name,
        reading_set: createFLT.Reading,
        writing_set: createFLT.Writing,
        listening_set: createFLT.Listening,
        speaking_set: createFLT.Speaking,
        difficulty_level: createFLT.difficulty_level,
      };
      const response = await ajaxCall(
        "/create-flt/",
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

  const handleRowSelection = (type) => (event) => {
    const selectedNode = event.api?.getSelectedNodes()[0];
    const selectedId = selectedNode?.data?.id;

    dispatchFLT({
      type,
      value: selectedId,
    });
  };

  const gridOptions = (rowData, handleRowSelection, type) => ({
    rowData,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      { headerCheckboxSelection: true, checkboxSelection: true },
      { headerName: "Exam Name", field: "Name", filter: true },
      {
        headerName: "Difficulty Level",
        field: "difficulty_level",
        filter: true,
      },
      type === "Reading" && {
        headerName: "Reading Set",
        field: "Reading.length",
        filter: true,
      },
      type === "Writing" && {
        headerName: "Writing Set",
        field: "Writing.length",
        filter: true,
      },
      type === "Listening" && {
        headerName: "Listening Set",
        field: "Listening.length",
        filter: true,
      },
      type === "Speaking" && {
        headerName: "Speaking Set",
        field: "Speaking.length",
        filter: true,
      },
    ].filter(Boolean),
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
                                    value={createFLT.name}
                                    onChange={(e) =>
                                      dispatchFLT({
                                        type: "name",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Difficulty Level</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={createFLT.difficulty_level}
                                    onChange={(e) =>
                                      dispatchFLT({
                                        type: "difficulty_level",
                                        value: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                  </select>
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
                                  <div className="ag-theme-alpine">
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Reading,
                                        handleRowSelection("Reading"),
                                        "Reading"
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(2) Writing : </label>
                                  <div className="ag-theme-alpine">
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Writing,
                                        handleRowSelection("Writing"),
                                        "Writing"
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(3) Listening : </label>
                                  <div className="ag-theme-alpine">
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Listening,
                                        handleRowSelection("Listening"),
                                        "Listening"
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="dashboard__form__wraper mt-4">
                                <div className="dashboard__form__input">
                                  <label>(4) Speaking : </label>
                                  <div className="ag-theme-alpine">
                                    <AgGridReact
                                      {...gridOptions(
                                        exams.Speaking,
                                        handleRowSelection("Speaking"),
                                        "Speaking"
                                      )}
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
