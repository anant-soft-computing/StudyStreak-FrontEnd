import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import ajaxCall from "../../../helpers/ajaxCall";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ieltsSubCategory = [
  { name: "Academic", value: "Academic" },
  { name: "General", value: "General" },
  { name: "Foundation", value: "Foundation" },
  { name: "Grammar", value: "Grammar" },
];

const pteReadingSubCategory = [
  { name: "R&W: Fill in the blanks [RWFIB]", value: "RWFIB" },
  { name: "MC, choose multiple answers", value: "CMA" },
  { name: "Re-order paragraphs", value: "ROP" },
  { name: "R: Fill in the blanks [RFIB]", value: "RFIB" },
  { name: "MC, choose single answer", value: "CSA" },
];

const pteWritingSubCategory = [
  { name: "Summarize written text [SWT]", value: "SWT" },
  { name: "Write essay [WE]", value: "WE" },
];

const pteListeningSubCategory = [
  { name: "Summarize spoken text [SST]", value: "SST" },
  { name: "MC, choose multiple answers", value: "CMA" },
  { name: "Fill in the blanks [LFIB]", value: "LFIB" },
  { name: "Highlight correct summar", value: "HCS" },
  { name: "MC, choose single answer", value: "CSA" },
  { name: "Select missing words [SMW]", value: "SMW" },
  { name: "Highlight incorrect words", value: "HIW" },
  { name: "Write from diction [WFD]", value: "WFD" },
];

const pteSpeakingSubCategory = [
  { name: "Read aloud [RA]", value: "RA" },
  { name: "Repeat sentence [RS]", value: "RS" },
  { name: "Describe image [DI]", value: "DI" },
  { name: "Re-tell lecture [RL]", value: "RL" },
  { name: "Answer short question [ASQ]", value: "ASQ" },
  { name: "Respond to a sitution [RTS]", value: "RTS" },
  { name: "Summarize group discussion [SGD]", value: "SGD" },
];

const getDefaultSubCategory = (category, type) => {
  if (category === "IELTS") return "Academic";

  if (category === "PTE") {
    switch (type) {
      case "Reading":
        return "RWFIB";
      case "Writing":
        return "SWT";
      case "Listening":
        return "SST";
      case "Speaking":
        return "RA";
      default:
        return "";
    }
  }
  return "";
};

const initialPT = {
  Name: "",
  difficulty_level: "Easy",
  sub_category: "",
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

const PT = ({ category, type, activeTab }) => {
  const navigate = useNavigate();
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

  const examSubCategory =
    category === "IELTS"
      ? ieltsSubCategory
      : category === "PTE"
      ? type === "Reading"
        ? pteReadingSubCategory
        : type === "Writing"
        ? pteWritingSubCategory
        : type === "Listening"
        ? pteListeningSubCategory
        : type === "Speaking"
        ? pteSpeakingSubCategory
        : []
      : [];

  useEffect(() => {
    const defaultValue = getDefaultSubCategory(category, type);
    dispatchPT({ type: "sub_category", value: defaultValue });
  }, [category, type]);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const resetReducerForm = () => {
    dispatchPT({ type: "reset" });
  };

  useEffect(() => {
    const fetchExams = async () => {
      if (activeTab !== "Create PT") return;
      setIsLoading(true);
      try {
        const url =
          type === "Speaking"
            ? `/speaking-block/?exam_category=${category}&sub_category=${createPT.sub_category}`
            : `/exam/blocks/?exam_type=${type}&exam_category=${category}&sub_category=${createPT.sub_category}`;
        const response = await ajaxCall(
          url,
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
          if (type === "Speaking") {
            const filteredData = response.data.filter(
              (item) => item.block_threshold === 1
            );
            setExams((prev) => ({ ...prev, Speaking: filteredData }));
          } else {
            const filteredData = response.data.filter(
              (item) =>
                item.exam_type === type && item.block_type === "Mock Test"
            );
            setExams((prev) => ({ ...prev, [type]: filteredData }));
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [activeTab, category, type, createPT.sub_category]);

  const validateForm = () => {
    if (!createPT.Name) {
      setFormError("Name is Required");
      return false;
    }
    if (createPT[type].length === 0) {
      setFormError(`Please Choose at least one ${type} Exam`);
      return false;
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const createPTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus((prev) => ({ ...prev, isSubmitting: true }));
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
          method: "POST",
          body: JSON.stringify({
            ...createPT,
            practice_test_type: type,
            category,
          }),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        navigate("/admin-exam");
        toast.success("Practice Exam Created Successfully");
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleRowSelection = (type) => (event) => {
    const selectedNodes = event.api?.getSelectedNodes() || [];
    const selectedIds = selectedNodes.map((node) => node?.data?.id);
    const total = selectedNodes.reduce((total, node) => {
      return (
        total + (node.data.no_of_questions || node.data.questions?.length || 0)
      );
    }, 0);
    setTotalQuestions(total);
    dispatchPT({ type, value: selectedIds });
  };

  const gridOptions = (rowData, handleRowSelection) => ({
    rowData,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        width: 110,
      },
      {
        headerName: "Exam Name",
        field: "exam_name",
        filter: true,
        valueGetter: (params) => params.data?.exam_name || params.data?.name,
        width: 400,
      },
      {
        headerName: "Exam Category",
        field: "exam_category",
        filter: true,
        valueGetter: (params) => params.data?.exam_category || "-",
        width: 230,
      },
      {
        headerName: "Exam Type",
        field: "exam_type",
        filter: true,
        valueGetter: (params) => params.data?.exam_type || "Speaking",
        width: 230,
      },
      {
        headerName: "No. Of Questions",
        field: "no_of_questions",
        filter: true,
        valueGetter: (params) =>
          params.data?.no_of_questions || params.data?.questions?.length,
        width: 230,
      },
      {
        headerName: "Block Type",
        field: "block_type",
        filter: true,
        valueGetter: (params) => params.data?.block_type || "Mock Test",
        width: 230,
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
      {(category === "IELTS" || category === "PTE") && (
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <div className="dashboard__select__heading">
            <span>Exam category</span>
          </div>
          <div className="dashboard__selector">
            <select
              className="form-select"
              value={createPT.sub_category}
              onChange={(e) =>
                dispatchPT({ type: "sub_category", value: e.target.value })
              }
            >
              {examSubCategory.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {exams[type]?.length > 0 && (
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Total No. of Questions: {totalQuestions}</label>
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
                rowSelection="multiple"
              />
            </div>
          ) : (
            <h5 className="text-center text-danger">{`No ${type} Exams Available!`}</h5>
          )}
        </div>
      </div>
      <div className="create__course__bottom__button text-center mt-3">
        {formStatus.isError && (
          <div className="text-danger mb-2">{formStatus.errMsg}</div>
        )}
        <button
          onClick={createPTest}
          className="default__button"
          disabled={formStatus?.isSubmitting}
        >
          {formStatus.isSubmitting ? "Creating..." : "Create PT"}
        </button>
      </div>
    </div>
  );
};

export default PT;
