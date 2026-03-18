import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Tab from "../../../UI/Tab";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";

const initialPackageData = {
  package_name: "",
  package_price: "",
  duration: 0,
  PackageType: "",
  select_course: "",
  soft_copy: false,
  hard_copy: false,
  full_length_test: false,
  full_length_test_count: 0,
  practice_test: false,
  practice_test_count: 0,
  speaking_test: false,
  speaking_test_count: 0,
  writing_evaluation: false,
  writing_evaluation_count: 0,
  live_classes_membership: false,
  online_membership: false,
  offline_membership: false,
  group_doubt_solving: false,
  group_doubt_solving_count: 0,
  one_to_one_doubt_solving: false,
  one_to_one_doubt_solving_count: 0,
  speaking_practice: false,
  speaking_practice_count: 0,
  tutor_support: false,
  tutor_support_count: 0,
  webinar: false,
  webinar_count: 0,
  counselling: false,
  counselling_count: 0,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreatePackage = (state, action) => {
  if (action.type === "reset") {
    return initialPackageData;
  }
  return { ...state, [action.type]: action.value };
};

const tabs = [
  { name: "Package" },
  { name: "Materials" },
  { name: "Tests" },
  { name: "Membership" },
  { name: "Classes" },
];

const validateForm = (createPackageData, setFormError) => {
  if (!createPackageData.PackageType) {
    setFormError("Package Type is Required");
    return false;
  }
  if (!createPackageData.select_course) {
    setFormError("Course is Required");
    return false;
  }
  if (!createPackageData.full_length_test_count) {
    setFormError("Full length test count is Required");
    return false;
  }
  if (!createPackageData.practice_test_count) {
    setFormError("Practice test count is Required");
    return false;
  }
  if (!createPackageData.speaking_test_count) {
    setFormError("Speaking test count is Required");
    return false;
  }

  if (!createPackageData.group_doubt_solving_count) {
    setFormError("Group doubt solving count is Required");
    return false;
  }

  if (!createPackageData.one_to_one_doubt_solving_count) {
    setFormError("One to one doubt solving count is Required");
    return false;
  }
  return true;
};

const CreatePackage = ({ setMainTab }) => {
  const [createPackageData, dispatchCreatePackage] = useReducer(
    reducerCreatePackage,
    initialPackageData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Package");
  const authData = useSelector((state) => state.authStore);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const resetReducerForm = () => {
    dispatchCreatePackage({ type: "reset" });
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createPackage = async (e) => {
    e.preventDefault();
    if (!validateForm(createPackageData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const response = await ajaxCall(
        "/packagecreateview/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(createPackageData),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setMainTab("View Package");
        toast.success("Package Created Successfully");
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
    <div>
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "Package" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Package Name</label>
                  <input
                    type="text"
                    placeholder="Package Name"
                    value={createPackageData?.package_name}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "package_name",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Package Price</label>
                  <input
                    type="text"
                    placeholder="Package Price"
                    value={createPackageData?.package_price}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "package_price",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Duration</label>
                  <input
                    type="number"
                    placeholder="In Months"
                    value={createPackageData?.duration}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "duration",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Package Type</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createPackageData?.PackageType}
                  onChange={(val) => {
                    dispatchCreatePackage({
                      type: "PackageType",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/packagetypeview/"
                  objKey={["name"]}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Course</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createPackageData?.select_course}
                  onChange={(val) => {
                    dispatchCreatePackage({
                      type: "select_course",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/courselistforpackage/"
                  objKey={["Course_Title"]}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Materials" ? "show active" : ""
          }`}
        >
          <div className="d-flex gap-4">
            <div className="form__check">
              <label>Soft Copy</label>{" "}
              <input
                type="checkbox"
                value={createPackageData?.soft_copy}
                checked={createPackageData?.soft_copy}
                onChange={(e) => {
                  dispatchCreatePackage({
                    type: "soft_copy",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
            <div className="form__check">
              <label>Hard Copy</label>{" "}
              <input
                type="checkbox"
                value={createPackageData?.hard_copy}
                checked={createPackageData?.hard_copy}
                onChange={(e) => {
                  dispatchCreatePackage({
                    type: "hard_copy",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Tests" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Full Length Test Count</label>
                  <input
                    type="number"
                    placeholder="Full Length Test Count"
                    value={createPackageData.full_length_test_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "full_length_test_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Full Length Test</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData?.full_length_test}
                    checked={createPackageData?.full_length_test}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "full_length_test",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Practice Test Count</label>
                  <input
                    type="number"
                    placeholder="Practice Test Count"
                    value={createPackageData?.practice_test_count}
                    checked={createPackageData?.practice_test_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "practice_test_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Practice Test</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData?.practice_test}
                    checked={createPackageData?.practice_test}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "practice_test",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Specking Test Count</label>
                  <input
                    type="number"
                    placeholder="Specking Test Count"
                    value={createPackageData?.speaking_test_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "speaking_test_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Specking Test</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData?.speaking_test}
                    checked={createPackageData?.speaking_test}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "speaking_test",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Writing Evaluation Count</label>
                  <input
                    type="number"
                    placeholder="Writing Evaluation Count"
                    value={createPackageData?.writing_evaluation_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "writing_evaluation_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Writing Evaluation</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData?.writing_evaluation}
                    checked={createPackageData?.writing_evaluation}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "writing_evaluation",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Membership" ? "show active" : ""
          }`}
        >
          <div className="d-flex gap-4">
            <div className="form__check">
              <label>Live Classes Membership</label>{" "}
              <input
                type="checkbox"
                value={createPackageData?.live_classes_membership}
                checked={createPackageData?.live_classes_membership}
                onChange={(e) => {
                  dispatchCreatePackage({
                    type: "live_classes_membership",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
            <div className="form__check">
              <label>Online Membership</label>{" "}
              <input
                type="checkbox"
                value={createPackageData?.online_membership}
                checked={createPackageData?.online_membership}
                onChange={(e) => {
                  dispatchCreatePackage({
                    type: "online_membership",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
            <div className="form__check">
              <label>Offline Membership</label>{" "}
              <input
                type="checkbox"
                value={createPackageData?.offline_membership}
                checked={createPackageData?.offline_membership}
                onChange={(e) => {
                  dispatchCreatePackage({
                    type: "offline_membership",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Classes" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>One To One Doubt Solving Count</label>
                  <input
                    type="number"
                    placeholder="One To One Doubt Solving Count"
                    value={createPackageData.one_to_one_doubt_solving_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "one_to_one_doubt_solving_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>One To One Doubt Solving</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData.one_to_one_doubt_solving}
                    checked={createPackageData.one_to_one_doubt_solving}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "one_to_one_doubt_solving",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Group Doubt Solving Count</label>
                  <input
                    type="number"
                    placeholder="Group Doubt Solving Count"
                    value={createPackageData.group_doubt_solving_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "group_doubt_solving_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Group Doubt Solving</label>{" "}
                  <input
                    type="checkbox"
                    value={createPackageData?.group_doubt_solving}
                    checked={createPackageData?.group_doubt_solving}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "group_doubt_solving",
                        value: e.target.checked,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Speaking Practice Count</label>
                  <input
                    type="number"
                    placeholder="Speaking Practice Count"
                    value={createPackageData.speaking_practice_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "speaking_practice_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Speaking Practice</label>{" "}
                  <input
                    type="checkbox"
                    checked={createPackageData.speaking_practice}
                    value={createPackageData.speaking_practice}
                    onChange={(e) =>
                      dispatchCreatePackage({
                        type: "speaking_practice",
                        value: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Tutor Support Count</label>
                  <input
                    type="number"
                    placeholder="Tutor Support Count"
                    value={createPackageData.tutor_support_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "tutor_support_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Tutor Support</label>{" "}
                  <input
                    type="checkbox"
                    checked={createPackageData.tutor_support}
                    value={createPackageData.tutor_support}
                    onChange={(e) =>
                      dispatchCreatePackage({
                        type: "tutor_support",
                        value: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Webinar Count</label>
                  <input
                    type="number"
                    placeholder="Webinar Count"
                    value={createPackageData.webinar_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "webinar_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Webinar</label>{" "}
                  <input
                    type="checkbox"
                    checked={createPackageData.webinar}
                    value={createPackageData.webinar}
                    onChange={(e) =>
                      dispatchCreatePackage({
                        type: "webinar",
                        value: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Counselling Count</label>
                  <input
                    type="number"
                    placeholder="Counselling Count"
                    value={createPackageData.counselling_count}
                    onChange={(e) => {
                      dispatchCreatePackage({
                        type: "counselling_count",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form__check">
                  <label>Counselling</label>{" "}
                  <input
                    type="checkbox"
                    checked={createPackageData.counselling}
                    value={createPackageData.counselling}
                    onChange={(e) =>
                      dispatchCreatePackage({
                        type: "counselling",
                        value: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create__course__bottom__button text-center mt-4">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Spinner animation="border" style={{ color: "#01579b" }} />
            ) : (
              <button
                className="default__button"
                onClick={createPackage}
                disabled={formStatus.isSubmitting}
              >
                Create Package
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
