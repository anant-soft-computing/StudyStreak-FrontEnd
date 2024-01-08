import React from 'react';
import TopBar from '../../TopBar/TopBar';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import DSNavBar from './DSNavBar/DSNavBar';
import DSSidebar from './DSSideBar/DSSideBar';
import counter1 from '../../../img/counter/counter__1.png';
import counter2 from '../../../img/counter/counter__2.png';
import counter3 from '../../../img/counter/counter__3.png';
import Courses from '../../../pages/Courses/Courses';
import CourseListItem from '../../../pages/Courses/CourseListItem';

const Dashboard = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div>
            <div className='theme__shadow__circle'></div>
            <div className='theme__shadow__circle shadow__right'></div>
          </div>
          <div className='dashboardarea sp_bottom_100'>
            <DSNavBar />
            <div className='dashboard'>
              <div className='container-fluid full__width__padding'>
                <div className='row'>
                  <DSSidebar />
                  <div className='col-xl-9 col-lg-9 col-md-12'>
                    <div className='dashboard__content__wraper'>
                      <div className='dashboard__section__title'>
                        <h4>Dashboard</h4>
                      </div>
                      <div className='row'>
                        <div className='col-xl-4 col-lg-6 col-md-12 col-12'>
                          <div className='dashboard__single__counter'>
                            <div className='counterarea__text__wraper'>
                              <div className='counter__img'>
                                <img src={counter1} alt='counter' />
                              </div>
                              <div className='counter__content__wraper'>
                                <p>View My Lessons</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xl-4 col-lg-6 col-md-12 col-12'>
                          <div className='dashboard__single__counter'>
                            <div className='counterarea__text__wraper'>
                              <div className='counter__img'>
                                <img src={counter2} alt='counter' />
                              </div>
                              <div className='counter__content__wraper'>
                                <p>View Lessons</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xl-4 col-lg-6 col-md-12 col-12'>
                          <div className='dashboard__single__counter'>
                            <div className='counterarea__text__wraper'>
                              <div className='counter__img'>
                                <img src={counter3} alt='counter' />
                              </div>
                              <div className='counter__content__wraper'>
                                <p>Meet a Counselllor</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='dashboard__content__wraper'>
                      <div className='dashboard__section__title'>
                        <h4>Leaderboard</h4>
                        <h6>Practice daily and lead the game!</h6>
                      </div>
                      <div className='row'>
                        <div className='col-xl-12'>
                          <div className='dashboard__table table-responsive'>
                            <table>
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>Name</th>
                                  <th>Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                    <div>1.</div>
                                  </th>
                                  <td>Amish Patel</td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      1240 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr className='dashboard__table__row'>
                                  <th>
                                    <div>2.</div>
                                  </th>
                                  <td>Rohini Chaudhary</td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      1100 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <div>3.</div>
                                  </th>
                                  <td>Sweety Gill</td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      879 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr className='dashboard__table__row'>
                                  <th>
                                    <div>4.</div>
                                  </th>
                                  <td>Amiraj Solanki</td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      800 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <div>152.</div>
                                  </th>
                                  <td>Krina Patel</td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      432 pts
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='dashboard__content__wraper'>
                      <div className='dashboard__section__title'>
                        <h4>Courses</h4>
                        <h6>Choose the best course for you!</h6>
                      </div>
                      <div className='row'>
                        <div className='col-xl-12'>
                          <div className='dashboard__table '>
                            <CourseListItem />
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

export default Dashboard;
