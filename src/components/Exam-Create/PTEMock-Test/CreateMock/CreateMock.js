import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const intialMockData = {
  name: "",
  sub_category: "",
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

const reducerMock = (state, action) => {
  if (action.type === "reset") {
    return action.payload || intialMockData;
  }
  return { ...state, [action.type]: action.value };
};

const CreateMock = ({ activeTab, primaryTab }) => {
  const [exams, setExams] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [createFLT, dispatchFLT] = useReducer(reducerMock, intialMockData);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const resetReducerForm = () => {
    dispatchFLT({ type: "reset" });
  };

  useEffect(() => {
    if (activeTab === "Create Mock") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/moduleListView/?category=PTE",
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
          if (response?.status === 200) {
            const data = response?.data;
            const updatedExams = {
              Reading: data.filter(
                ({ practice_test_type }) => practice_test_type === "Reading"
              ),
              Writing: data.filter(
                ({ practice_test_type }) => practice_test_type === "Writing"
              ),
              Listening: data.filter(
                ({ practice_test_type }) => practice_test_type === "Listening"
              ),
              Speaking: data.filter(
                ({ practice_test_type }) => practice_test_type === "Speaking"
              ),
            };
            setExams(updatedExams);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeTab]);

  const validateForm = () => {
    const requiredFields = [
      { field: "name", message: "Name is Required" },
      { field: "Reading", message: "Please Choose a Reading Practice Test" },
      { field: "Writing", message: "Please Choose a Writing Practice Test" },
      {
        field: "Listening",
        message: "Please Choose a Listening Practice Test",
      },
      { field: "Speaking", message: "Please Choose a Speaking Practice Test" },
    ];
    for (const fieldData of requiredFields) {
      const field = fieldData.field;
      if (!createFLT[field]) {
        setFormError(fieldData.message);
        return false;
      }
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const createFullLengthTest = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const data = {
        category: "PTE",
        name: createFLT.name,
        reading_set: createFLT.Reading,
        writing_set: createFLT.Writing,
        listening_set: createFLT.Listening,
        speaking_set: createFLT.Speaking,
        sub_category: createFLT.sub_category,
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
        primaryTab("View Exam");
        toast.success("Free Mock Test Created Successfully");
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
    const selectedNode = event.api?.getSelectedNodes()[0];
    const selectedId = selectedNode?.data?.id;
    dispatchFLT({ type, value: selectedId });
  };

  const gridOptions = (rowData, handleRowSelection, type) => ({
    rowData,
    onSelectionChanged: handleRowSelection,
    columnDefs: [
      {
        headerName: "No.",
        field: "no",
        resizable: false,
        width: 68,
        cellRenderer: (params) => params.rowIndex + 1,
      },
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        width: 50,
      },
      { headerName: "Exam Name", field: "Name", filter: true, width: 228 },
      type === "Reading" && {
        headerName: "Reading Set",
        field: "reading_count",
        filter: true,
      },
      type === "Writing" && {
        headerName: "Writing Set",
        field: "writing_count",
        filter: true,
      },
      type === "Listening" && {
        headerName: "Listening Set",
        field: "listening_count",
        filter: true,
      },
      type === "Speaking" && {
        headerName: "Speaking Set",
        field: "speaking_count",
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
    <>
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
                  dispatchFLT({ type: "name", value: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="d-flex flex-wrap gap-3">
            <div className="dashboard__form__input">
              <label>(1) Reading : </label>
              {isLoading ? (
                <Loading />
              ) : exams.Reading?.length > 0 ? (
                <div className="ag-theme-quartz">
                  <AgGridReact
                    {...gridOptions(
                      exams.Reading,
                      handleRowSelection("Reading"),
                      "Reading"
                    )}
                  />
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No Reading Exam Available !!
                </h5>
              )}
            </div>
            <div className="dashboard__form__input">
              <label>(2) Writing : </label>
              {isLoading ? (
                <Loading />
              ) : exams.Writing?.length > 0 ? (
                <div className="ag-theme-quartz">
                  <AgGridReact
                    {...gridOptions(
                      exams.Writing,
                      handleRowSelection("Writing"),
                      "Writing"
                    )}
                  />
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No Writing Exam Available !!
                </h5>
              )}
            </div>
          </div>
          <div className="d-flex flex-wrap gap-3 mt-3">
            <div className="dashboard__form__input">
              <label>(3) Listening : </label>
              {isLoading ? (
                <Loading />
              ) : exams.Listening?.length > 0 ? (
                <div className="ag-theme-quartz">
                  <AgGridReact
                    {...gridOptions(
                      exams.Listening,
                      handleRowSelection("Listening"),
                      "Listening"
                    )}
                  />
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No Listening Exam Available !!
                </h5>
              )}
            </div>
            <div className="dashboard__form__input">
              <label>(4) Speaking : </label>
              {isLoading ? (
                <Loading />
              ) : exams.Speaking?.length > 0 ? (
                <div className="ag-theme-quartz">
                  <AgGridReact
                    {...gridOptions(
                      exams.Speaking,
                      handleRowSelection("Speaking"),
                      "Speaking"
                    )}
                  />
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No Speaking Exam Available !!
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="create__course__bottom__button text-center mt-3">
        {formStatus.isError && (
          <div className="text-danger mb-2">{formStatus.errMsg}</div>
        )}
        <button
          className="default__button"
          onClick={createFullLengthTest}
          disabled={formStatus.isSubmitting}
        >
          {formStatus.isSubmitting ? "Creating..." : "Create Mock"}
        </button>
      </div>
    </>
  );
};

export default CreateMock;
