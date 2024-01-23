import React, { useState } from 'react';
import Footer from '../../../Footer/Footer';
import TopBar from '../../../TopBar/TopBar';
import NavBar from '../../../NavBar/NavBar';
import DANavBar from '../DANavBar/DANavBar';
import DASideBar from '../DASideBar/DASideBar';
import CreatePackage from './CreatePackage';
import ViewPackages from './ViewPackages';

const Package = () => {
  const [activeTab, setActiveTab] = useState('createPackage');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='theme__shadow__circle'></div>
          <div className='theme__shadow__circle shadow__right'></div>
          <div className='dashboardarea sp_bottom_100'>
            <DANavBar />
            <div className='dashboard'>
              <div className='container-fluid full__width__padding'>
                <div className='row'>
                  <DASideBar />
                  <div className='col-xl-9 col-lg-9 col-md-12'>
                    <div className='dashboard__content__wraper'>
                      <div className='dashboard__section__title'>
                        <h4>Package</h4>
                      </div>
                      <div className='row'>
                        <div
                          className='col-xl-12 aos-init aos-animate'
                          data-aos='fade-up'
                        >
                          <ul
                            className='nav  about__button__wrap dashboard__button__wrap'
                            id='myTab'
                            role='tablist'
                          >
                            <li className='nav-item' role='presentation'>
                              <button
                                className={`single__tab__link ${
                                  activeTab === 'createPackage' ? 'active' : ''
                                }`}
                                data-bs-toggle='tab'
                                data-bs-target='#projects__one'
                                type='button'
                                aria-selected='true'
                                role='tab'
                                onClick={() => handleTabChange('createPackage')}
                              >
                                Create Package
                              </button>
                            </li>
                            <li className='nav-item' role='presentation'>
                              <button
                                className={`single__tab__link ${
                                  activeTab === 'viewPackage' ? 'active' : ''
                                }`}
                                data-bs-toggle='tab'
                                data-bs-target='#projects__two'
                                type='button'
                                aria-selected='false'
                                role='tab'
                                tabindex='-1'
                                onClick={() => handleTabChange('viewPackage')}
                              >
                                View Package
                              </button>
                            </li>
                            <li className='nav-item' role='presentation'>
                              <button
                                className='single__tab__link'
                                data-bs-toggle='tab'
                                data-bs-target='#projects__three'
                                type='button'
                                aria-selected='false'
                                role='tab'
                                tabindex='-1'
                              >
                                Assign Package
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className='tab-content tab__content__wrapper aos-init aos-animate'
                          id='myTabContent'
                          data-aos='fade-up'
                        >
                          <div
                            className={`tab-pane fade ${
                              activeTab === 'createPackage' ? 'show active' : ''
                            }`}
                            id='projects__one'
                            role='tabpanel'
                            aria-labelledby='projects__one'
                          >
                            <div className='row'>
                              <CreatePackage />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === 'viewPackage' ? 'show active' : ''
                            }`}
                            id='projects__two'
                            role='tabpanel'
                            aria-labelledby='projects__two'
                          >
                            <div className='row'>
                              <ViewPackages key={activeTab} />
                            </div>
                          </div>
                          <div
                            className='tab-pane fade'
                            id='projects__three'
                            role='tabpanel'
                            aria-labelledby='projects__three'
                          >
                            <div className='row'>Assign Package</div>
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
      <Footer />
    </>
  );
};

export default Package;
