import React, { useState } from "react";

const CreateLesson = () => {
  const [attachments, setAttachments] = useState([
    { file: null, description: "" },
  ]);
  const [assignments, setAssignments] = useState([
    { file: null, description: "" },
  ]);

  const handleAddAttachment = () => {
    setAttachments([...attachments, { file: null, description: "" }]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { file: null, description: "" }]);
  };

  const handleRemoveAssignment = (index) => {
    const newAssignments = [...assignments];
    newAssignments.splice(index, 1);
    setAssignments(newAssignments);
  };
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
                      General
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
                            <div className="dashboard__select__heading">
                              <span>Section</span>
                            </div>
                            <div className="dashboard__selector">
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value="Reading">Reading</option>
                                <option value="Listening">Listening</option>
                                <option value="Specking">Specking</option>
                                <option value="Writing">Writing</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Lesson Title</label>
                                <input type="text" placeholder="Lesson Title" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Lesson Description</label>
                                <input
                                  type="text"
                                  placeholder="Lesson Description"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Lesson Video</label>
                                <input type="text" placeholder="Lesson Video" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Lesson Duration</label>
                                <input
                                  type="text"
                                  placeholder="Lesson Duration"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-4  ">
                            <div className="form__check">
                              <label>Active</label> <input type="checkbox" />
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
                      Quiz Question
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
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Question</label>
                                <input type="text" placeholder="Question" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Answere</label>
                                <input type="text" placeholder="Answere" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-4  ">
                            <div className="form__check">
                              <label>Is This Correct ? </label>{" "}
                              <input type="checkbox" />
                            </div>
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
                      Attachment
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                          <button
                            className="btn btn-success float-end"
                            type="button"
                            onClick={handleAddAttachment}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {attachments.map((index) => (
                        <div key={index} className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Attachment</label>
                                <input type="file" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Attachment Description</label>
                                <input
                                  type="text"
                                  placeholder="Attachment Description"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => handleRemoveAttachment(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
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
                      Assignment
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                          <button
                            className="btn btn-success float-end"
                            type="button"
                            onClick={handleAddAssignment}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {assignments.map((index) => (
                        <div key={index} className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Assignment</label>
                                <input type="file" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>Assignment Description</label>
                                <input
                                  type="text"
                                  placeholder="Assignment Description"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => handleRemoveAssignment(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-6 col-12">
                <div className="create__course__bottom__button">
                  <button className="default__button">Create Lesson</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
