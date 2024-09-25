import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../helpers/ajaxCall";
import Loading from "../../UI/Loading";

const initialPT = {
  Name: "",
  difficulty_level: "Easy",
  exam_test: "Practice",
  practice_test_type: "",
  Reading: [],
  Writing: [],
  Listening: [],
  Speaking: [],
  General: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerPT = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialPT;
  }
  return { ...state, [action.type]: action.value };
};

const PT = ({ category, type, activeTab, setActiveTab }) => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
    General: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [createPT, dispatchPT] = useReducer(reducerPT, initialPT);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const resetReducerForm = () => {
    dispatchPT({ type: "reset" });
    setActiveTab("View Exam");
  };

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const [examResponse, speakingResponse] = await Promise.all([
          ajaxCall(
            `/exam-blocks/?fields=id,exam_name,exam_type,exam_category,block_type,no_of_questions&exam_type=${type}&exam_category=${category}`,
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
          ),
          ajaxCall(
            "/speaking-block/",
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
          ),
        ]);

        if (examResponse.status === 200 && speakingResponse.status === 200) {
          const { data: examData } = examResponse;
          const { data: speakingData } = speakingResponse;

          const updatedExams = {
            Reading: examData.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
            Writing: examData.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
            Listening: examData.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
            Speaking: speakingData.filter(
              ({ block_threshold }) => block_threshold === 1
            ),
            General: examData.filter(
              ({ exam_type, block_type }) =>
                exam_type === type && block_type === "Mock Test"
            ),
          };
          setExams(updatedExams);
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === "Create PT") {
      fetchExams();
    }
  }, [activeTab, category, type]);

  const validateForm = () => {
    if (!createPT.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (
      (type === "Reading" && createPT.Reading.length === 0) ||
      (type === "Writing" && createPT.Writing.length === 0) ||
      (type === "Listening" && createPT.Listening.length === 0) ||
      (type === "Speaking" && createPT.Speaking.length === 0) ||
      (type === "General" && createPT.General.length === 0)
    ) {
      setFormError(`Please Choose at least one ${type} Exam`);
      return false;
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const createPTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = {
        Name: createPT.Name,
        exam_test: createPT.exam_test,
        practice_test_type: type,
        Reading: createPT.Reading,
        Writing: createPT.Writing,
        Listening: createPT.Listening,
        Speaking: createPT.Speaking,
        General: createPT.General,
        category: category,
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

  const rowSelection = "multiple";

  const handleRowSelection = (type) => (event) => {
    const selectedNodes = event.api?.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node?.data?.id);
    const total = selectedNodes.reduce((total, node) => {
      return (
        total + (node.data.no_of_questions || node.data.questions.length || 0)
      );
    }, 0);
    setTotalQuestions(total);
    dispatchPT({ type, value: selectedIds });
  };

  const gridOptions = (rowData, handleRowSelection) => {
    let columnDefs = [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        width: 110,
      },
      {
        headerName: "Exam Name",
        field: "exam_name" || "name",
        filter: true,
        valueGetter: (params) => {
          return params.data?.exam_name || params.data?.name;
        },
        width: 400,
      },
      {
        headerName: "Exam Category",
        field: "exam_category",
        filter: true,
        valueGetter: (params) => {
          return params.data?.exam_category || "-";
        },
        width: 230,
      },
      {
        headerName: "Exam Type",
        field: "exam_type" || "Speaking",
        filter: true,
        valueGetter: (params) => {
          return params.data?.exam_type || "Speaking";
        },
        width: 230,
      },
      {
        headerName: "No. Of Questions",
        field: "no_of_questions" || "questions.length",
        filter: true,
        valueGetter: (params) => {
          return params.data?.no_of_questions || params.data?.questions?.length;
        },
        width: 230,
      },
      {
        headerName: "Block Type",
        field: "block_type" || "Mock Test",
        filter: true,
        valueGetter: (params) => {
          return params.data?.block_type || "Mock Test";
        },
        width: 230,
      },
    ];

    return {
      rowData,
      onSelectionChanged: handleRowSelection,
      columnDefs,
      pagination: true,
      paginationPageSize: 20,
      domLayout: "autoHeight",
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
    };
  };

  return (
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
                dispatchPT({ type: "Name", value: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      {exams[type]?.length > 0 && (
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Total No. of Questions : {totalQuestions}</label>
          </div>
        </div>
      )}
      <div className="dashboard__form__wraper">
        <div className="dashboard__form__input">
          {isLoading ? (
            <Loading />
          ) : exams[type]?.length > 0 ? (
            <div className="ag-theme-quartz">
              <AgGridReact
                {...gridOptions(exams[type], handleRowSelection(type))}
                rowSelection={rowSelection}
              />
            </div>
          ) : (
            <h5 className="text-center text-danger">{`No ${type} Exams Avaiable !!`}</h5>
          )}
        </div>
      </div>
      <div className="create__course__bottom__button text-center mt-3">
        {formStatus.isError && (
          <div className="text-danger mb-2">{formStatus.errMsg}</div>
        )}
        <button className="default__button" onClick={createPTest}>
          Create PT
        </button>
      </div>
    </div>
  );
};

export default PT;
