import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useReducer, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const intialPT = {
  Name: "",
  difficulty_level: "Easy",
  exam_test: "Practice",
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

const reducerPT = (state, action) => {
  if (action.type === "reset") {
    return action.payload || intialPT;
  }
  return { ...state, [action.type]: action.value };
};

const PT = ({ type }) => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [createPT, dispatchPT] = useReducer(reducerPT, intialPT);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const resetReducerForm = () => {
    dispatchPT({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/exam-blocks/",
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
            Reading: data.filter(({ exam_type }) => exam_type === type),
            Writing: data.filter(({ exam_type }) => exam_type === type),
            Listening: data.filter(({ exam_type }) => exam_type === type),
            Speaking: data.filter(({ exam_type }) => exam_type === type),
          };
          setExams(updatedExams);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [type]);

  const validateForm = () => {
    if (!createPT.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (type === "Reading" && !createPT.Reading.length > 0) {
      setFormError("Please Choose at least one Reading Exam");
      return false;
    }
    if (type === "Writing" && !createPT.Writing.length > 0) {
      setFormError("Please Choose at least one Writing Exam");
      return false;
    }
    if (type === "Listening" && !createPT.Listening.length > 0) {
      setFormError("Please Choose at least one Listening Exam");
      return false;
    }
    if (type === "Speaking" && !createPT.Speaking.length > 0) {
      setFormError("Please Choose at least one Speaking Exam");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createPTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = {
        Name: createPT.Name,
        exam_test: createPT.exam_test,
        Reading: createPT.Reading,
        Writing: createPT.Writing,
        Listening: createPT.Listening,
        Speaking: createPT.Speaking,
        difficulty_level: createPT.difficulty_level,
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
        toast.success("Full Length Exam Create Successfully");
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

    const total = selectedNodes.reduce((total, node) => {
      return total + (node.data.no_of_questions || 0);
    }, 0);

    setTotalQuestions(total);

    dispatchPT({
      type,
      value: selectedIds,
    });
  };

  const gridOptions = (rowData, handleRowSelection) => ({
    rowData,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      { headerCheckboxSelection: true, checkboxSelection: true },
      { headerName: "Exam Name", field: "exam_name", filter: true },
      { headerName: "Exam Type", field: "exam_type", filter: true },
      {
        headerName: "No. Of Questions",
        field: "no_of_questions",
        filter: true,
      },
      { headerName: "Block Type", field: "block_type", filter: true },
      {
        headerName: "Difficulty Level",
        field: "difficulty_level",
        filter: true,
      },
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
                        PT Details
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
                                  <label>Practice Test Name</label>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    value={createPT.Name}
                                    onChange={(e) =>
                                      dispatchPT({
                                        type: "Name",
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
                                    value={createPT.difficulty_level}
                                    onChange={(e) =>
                                      dispatchPT({
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
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Total No. of Questions : {totalQuestions}
                                </label>
                              </div>
                            </div>
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <div className="ag-theme-alpine">
                                  <AgGridReact
                                    {...gridOptions(
                                      exams.Reading,
                                      handleRowSelection(type)
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
              <div className="create__course__bottom__button">
                {formStatus.isError ? (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                ) : (
                  <div className="text-success mb-2">{formStatus.errMsg}</div>
                )}
                <button className="default__button" onClick={createPTest}>
                  Create PT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PT;
