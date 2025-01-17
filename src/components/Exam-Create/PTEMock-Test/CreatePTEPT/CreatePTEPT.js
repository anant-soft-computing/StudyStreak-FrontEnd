import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import ajaxCall from "../../../../helpers/ajaxCall";
import "ag-grid-community/styles/ag-theme-quartz.css";

const initialPTEPT = {
  Name: "",
  difficulty_level: "Easy",
  sub_category: "",
  exam_test: "Practice",
  practice_test_type: "",
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

const reducerPTEPT = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialPTEPT;
  }
  return { ...state, [action.type]: action.value };
};

const CreatePTEPT = ({ activeTab,setActiveTab, category }) => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [type, setType] = useState("Reading");
  const [isLoading, setIsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [createPT, dispatchPT] = useReducer(reducerPTEPT, initialPTEPT);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const handleClear = () => {
    dispatchPT({ type: "reset" });
    setActiveTab("Create Mock");
    toast.success("Practice Exam For PTE Created Successfully");
  };

  useEffect(() => {
    const fetchExams = async () => {
      if (activeTab !== "Create PT") return;
      setIsLoading(true);
      try {
        const url =
          type === "Speaking"
            ? `/speaking-block/?exam_category=${category}`
            : `/exam/blocks/?exam_type=${type}&exam_category=${category}`;
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
  }, [activeTab, category, type]);

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
        handleClear();
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
        width: 100,
      },
      {
        headerName: "Exam Name",
        field: "exam_name",
        filter: true,
        valueGetter: (params) => params.data?.exam_name || params.data?.name,
        width: 400,
      },
      {
        headerName: "Exam Sub Category",
        field: "sub_category",
        filter: true,
        valueGetter: (params) => params.data?.sub_category || "-",
        width: 310,
      },
      {
        headerName: "Exam Type",
        field: "exam_type",
        filter: true,
        valueGetter: (params) => params.data?.exam_type || "Speaking",
        width: 310,
      },
      {
        headerName: "Block Type",
        field: "block_type",
        filter: true,
        valueGetter: (params) => params.data?.block_type || "Mock Test",
        width: 310,
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

      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__select__heading">
          <span>Exam Type</span>
        </div>
        <div className="dashboard__selector">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {["Reading", "Writing", "Listening", "Speaking"].map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div className="dashboard__form__wraper mt-3">
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

export default CreatePTEPT;
