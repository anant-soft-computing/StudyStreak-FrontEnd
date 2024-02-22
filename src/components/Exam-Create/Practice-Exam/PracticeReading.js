import React, { useEffect, useReducer, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const intialPRData = {
  Name: "",
  exam_test: "Practice",
  Reading: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerCreateCourse = (state, action) => {
  if (action.type === "reset") {
    return action.payload || intialPRData;
  }
  if (action.type === "Reading") {
    return { ...state, Reading: action.value };
  }
  return { ...state, [action.type]: action.value };
};

const PracticeReading = ({ examName, examType }) => {
  const [examList, setExamList] = useState([]);
  const [createPRExam, dispatchPRExam] = useReducer(
    reducerCreateCourse,
    intialPRData
  );
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
    dispatchPRExam({
      type: "reset",
    });
  };

  const getExams = async () => {
    try {
      const response = await ajaxCall(
        `/exam-blocks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        const examWithNumbers = response?.data?.filter(
          (exam) => exam.exam_type === "Reading"
        );
        setExamList(examWithNumbers);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const validateForm = () => {
    if (!createPRExam.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (!createPRExam.Reading.length > 0) {
      setFormError("Please Choose at least one Exam");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createPExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = {
        Name: createPRExam.Name,
        exam_test: createPRExam.exam_test,
        Reading: createPRExam.Reading,
      };
      const response = await ajaxCall(
        "/moduleListView/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        toast.success("Practice Exam Create Successfully");
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

  const handleRowSelection = (event) => {
    const selectedNodes = event.api?.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => (
      node?.data?.id
    ));

    const total = selectedNodes.reduce((total, node) => {
      return total + (node.data.no_of_questions || 0);
    }, 0);

    setTotalQuestions(total);

    dispatchPRExam({
      type: "Reading",
      value: selectedIds,
    });
  };

  const rowSelection = "multiple";

  const gridOptions = {
    rowData: examList,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      { headerCheckboxSelection: true, checkboxSelection: true },
      {
        headerName: "Exam Name",
        field: "exam_name",
        filter: true,
      },
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
  };

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
                        Practice Exam Details
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
                                  <label>Practice Exam Name</label>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    value={createPRExam.Name}
                                    onChange={(e) =>
                                      dispatchPRExam({
                                        type: "Name",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Total No. of Questions : {totalQuestions}</label>
                              </div>
                            </div>
                            <div className="ag-theme-alpine">
                              <AgGridReact
                                {...gridOptions}
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
              <div className="create__course__bottom__button">
                {formStatus.isError ? (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                ) : (
                  <div className="text-success mb-2">{formStatus.errMsg}</div>
                )}
                <button className="default__button" onClick={createPExam}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeReading;