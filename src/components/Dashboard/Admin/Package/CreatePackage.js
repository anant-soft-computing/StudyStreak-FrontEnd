import React from "react";
import SingleSelection from "../../../UI/SingleSelect";

const CreatePackage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-xl-8 col-lg-8 col-md-12 col-12"
            style={{ width: "-webkit-fill-available" }}
          >
            <div className="create__course__accordion__wraper">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item w-auto">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Package
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
                                <label>Package Name</label>
                                <input type="text" placeholder="Package Name" />
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
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Duration</label>
                                <input type="number" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Package Type</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Course</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                            <div className="dashboard__select__heading">
                              <span>Coupon Code</span>
                            </div>
                            <div className="dashboard__selector">
                              <SingleSelection />
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
                      Materials
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
                        <div className="d-flex gap-4">
                          <div className="form__check">
                            <label>Soft Copy</label> <input type="checkbox" />
                          </div>
                          <div className="form__check">
                            <label>Hard Copy</label> <input type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Tests
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Full Length Test Count</label>
                                <input
                                  type="number"
                                  placeholder="Full Length Test Count"
                                />
                              </div>
                              <div className="form__check">
                                <label>Full Length Test</label>{" "}
                                <input type="checkbox" />
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
                                />
                              </div>
                              <div className="form__check">
                                <label>Practice Test</label>{" "}
                                <input type="checkbox" />
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
                                />
                              </div>
                              <div className="d-flex gap-4">
                                <div className="form__check">
                                  <label>Specking Test</label>{" "}
                                  <input type="checkbox" />
                                </div>
                                <div className="form__check">
                                  <label>Writing Evaluation</label>{" "}
                                  <input type="checkbox" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Membership
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="d-flex gap-4">
                          <div className="form__check">
                            <label>Live Classes Membership</label>{" "}
                            <input type="checkbox" />
                          </div>
                          <div className="form__check">
                            <label>Online Membership</label>{" "}
                            <input type="checkbox" />
                          </div>
                          <div className="form__check">
                            <label>Offline Membership</label>{" "}
                            <input type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Doubt Solving
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="become__instructor__form">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Group Doubt Solving Count</label>
                                <input
                                  type="number"
                                  placeholder="Group Doubt Solving Count"
                                />
                              </div>
                              <div className="form__check">
                                <label>Group Doubt Solving</label>{" "}
                                <input type="checkbox" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>One To One Doubt Solving Count</label>
                                <input
                                  type="number"
                                  placeholder="One To One Doubt Solving Count"
                                />
                              </div>
                              <div className="form__check">
                                <label>One To One Doubt Solving</label>{" "}
                                <input type="checkbox" />
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
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-6 col-12">
                <div className="create__course__bottom__button">
                  <button className="default__button">Create Package</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePackage;
