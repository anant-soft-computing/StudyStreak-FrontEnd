import React from "react";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">First Name</label>
                <input type="text" placeholder="John" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Last Name</label>
                <input type="text" placeholder="Due" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">User Name</label>
                <input type="text" placeholder="johndue" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Phone No</label>
                <input type="text" placeholder="+1-202-555-0174" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Whatsapp No</label>
                <input type="text" placeholder="+1-202-555-0174" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Gender</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">City</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Vadodara">Vadodara</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Surat">Surat</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">State</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Country</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Country Interested In</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Last Education</label>
                <input type="text" placeholder="Last Education" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Interested In Visa Counselling</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Image</label>
                <input type="file" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <strong>Exams Taken Before</strong>
            <div className="d-flex flex-wrap gap-4">
              <div className="form__check mt-2">
                <label>IETLS</label> <input type="checkbox" />
              </div>
              <div className="form__check mt-2">
                <label>Duolingo</label> <input type="checkbox" />
              </div>
              <div className="form__check mt-2">
                <label>PTE</label> <input type="checkbox" />
              </div>
              <div className="form__check mt-2">
                <label>TOEFL</label> <input type="checkbox" />
              </div>
              <div className="form__check mt-2">
                <label>GRE</label> <input type="checkbox" />
              </div>
              <div className="form__check mt-2">
                <label>GMAT</label> <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Reference By</label>
                <textarea name="" id="" cols="10" rows="3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Remark</label>
                <textarea name="" id="" cols="10" rows="3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Bio</label>
                <textarea name="" id="" cols="10" rows="3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <Link className="default__button" to="#">
                Update Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
