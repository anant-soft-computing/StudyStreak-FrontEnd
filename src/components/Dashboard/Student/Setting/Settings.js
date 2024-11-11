import React from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import Profile from "./UpdateProfile";

const Settings = () => {
  return (
    <div className='body__wrapper'>
      <div className='main_wrapper overflow-hidden'>
        <div className='dashboardarea sp_bottom_100'>
          <div className='dashboard'>
            <div className='container-fluid full__width__padding'>
              <div className='row'>
                <DSSidebar />
                <div className='col-xl-12 col-lg-12 col-md-12'>
                  <div className='dashboard__content__wraper'>
                    <div className='dashboard__section__title'>
                      <h4>Settings</h4>
                    </div>
                    <div className='row'>
                      <div className='col-xl-12 aos-init aos-animate'>
                        <ul
                          className='nav  about__button__wrap dashboard__button__wrap'
                          id='myTab'
                          role='tablist'
                        >
                          <li className='nav-item' role='presentation'>
                            <button
                              className='single__tab__link active'
                              data-bs-toggle='tab'
                              data-bs-target='#projects__one'
                              type='button'
                              aria-selected='true'
                              role='tab'
                            >
                              Profile
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className='tab-content tab__content__wrapper aos-init aos-animate'>
                        <div
                          className='tab-pane fade active show'
                          role='tabpanel'
                          aria-labelledby='projects__one'
                        >
                          <Profile />
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
    </div>
  );
};

export default Settings;
