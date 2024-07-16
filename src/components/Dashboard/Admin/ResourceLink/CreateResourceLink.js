import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../UI/Loading";
import SingleSelection from "../../../UI/SingleSelect";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialResourceLinkData = {
  student: "",
  batch: "",
  course: "",
  resources: [{ document: "", description: "" }],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreateResourceLink = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialResourceLinkData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const CreateResourceLink = ({ setActiveTab }) => {
  const [createRLData, dispatchCreateRL] = useReducer(
    reducerCreateResourceLink,
    initialResourceLinkData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCreateRL({ type: "reset" });
  };

  const addContent = () => {
    dispatchCreateRL({
      type: "resources",
      value: [...createRLData.resources, { description: "", document: "" }],
    });
  };

  const removeContent = (index) => {
    const updatedItems = createRLData.resources.filter((_, i) => i !== index);
    dispatchCreateRL({
      type: "resources",
      value: updatedItems,
    });
  };

  const createRL = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const formData = new FormData();

      formData.append("student", createRLData.student);
      formData.append("batch", createRLData.batch);
      formData.append("course", createRLData.course);

      createRLData.resources.forEach((resource, index) => {
        formData.append(
          `resources[${index}][description]`,
          resource.description
        );
        formData.append(`resources[${index}][document]`, resource.document);
      });
      const response = await ajaxCall(
        "/resources/",
        {
          headers: {
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Resource Link");
        toast.success("Resource Link Created Successfully");
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
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Student</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createRLData?.student}
                onChange={(val) => {
                  dispatchCreateRL({
                    type: "student",
                    value: val,
                  });
                }}
                url="/student-list/"
                objKey={["full_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Batch</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createRLData?.batch}
                onChange={(val) => {
                  dispatchCreateRL({
                    type: "batch",
                    value: val,
                  });
                }}
                url="/batchview/"
                objKey={["batch_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Course</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={createRLData?.course}
                onChange={(val) => {
                  dispatchCreateRL({
                    type: "course",
                    value: val,
                  });
                }}
                url="/courselistforpackage/"
                objKey={["Course_Title"]}
              />
            </div>
          </div>
        </div>
        {createRLData.resources.map((item, index) => (
          <div className="row mt-4" key={index}>
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label htmlFor={`description-${index}`}>Description</label>
                  <div className="d-flex align-items-center">
                    <input
                      id={`description-${index}`}
                      type="text"
                      className="form-control"
                      placeholder="Description of Resource Link"
                      value={item.description}
                      onChange={(e) => {
                        const updatedItems = [...createRLData.resources];
                        updatedItems[index].description = e.target.value;
                        dispatchCreateRL({
                          type: "resources",
                          value: updatedItems,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label htmlFor={`document-${index}`}>Document</label>
                  <div className="d-flex align-items-center">
                    <input
                      id={`document-${index}`}
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const updatedItems = [...createRLData.resources];
                        updatedItems[index].document = file;
                        dispatchCreateRL({
                          type: "resources",
                          value: updatedItems,
                        });
                      }}
                    />
                    {createRLData.resources.length > 1 && (
                      <button
                        className="dashboard__small__btn__2 flash-card__remove__btn"
                        onClick={() => removeContent(index)}
                      >
                        <i className="icofont-ui-delete" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-xl-12">
          <button className="dashboard__small__btn__2" onClick={addContent}>
            + Description & Document
          </button>
        </div>

        <div className="col-xl-12 text-center">
          <div className="dashboard__form__button text-center mt-4">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Loading color="primary" text="Creating Resource Link..." />
            ) : (
              <button
                className="default__button"
                onClick={createRL}
                disabled={formStatus.isSubmitting}
              >
                Create Resource Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResourceLink;
