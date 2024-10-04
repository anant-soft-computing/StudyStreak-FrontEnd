import React from "react";
import SingleSelection from "../../../UI/SingleSelect";
import SelectionBox from "../../../UI/SelectionBox";

const CreateLesson = () => {
  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Section</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection isSearch={true} />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Title</label>
            <input type="text" placeholder="Lesson Title" />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Description</label>
            <input type="text" placeholder="Lesson Description" />
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Video</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection isSearch={true} />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Duration</label>
            <input type="text" placeholder="Lesson Duration" />
          </div>
        </div>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__select__heading">
          <span>Assignment</span>
        </div>
        <div className="dashboard__selector">
          <SelectionBox
            url="/requirementsview/"
            name="description"
            objKey={["description"]}
            isSearch={true}
            multiple={true}
          />
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Sequence</label>
            <input type="number" placeholder="Lesson Sequence" />
          </div>
        </div>
      </div>
      <div className="form__check">
        <label>Is Active</label> <input type="checkbox" />
      </div>
      <div className="create__course__bottom__button text-center mt-4">
        <button className="default__button">Create Lesson</button>
      </div>
    </div>
  );
};

export default CreateLesson;
