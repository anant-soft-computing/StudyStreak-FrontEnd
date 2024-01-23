import React, { useEffect, useState } from 'react';
import TopBar from '../../TopBar/TopBar';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import DSNavBar from './DSNavBar/DSNavBar';
import DSSidebar from './DSSideBar/DSSideBar';
import { cancelIcon, checkIcon } from '../../CourseDetail/PackageDetails';
import ajaxCall from '../../../helpers/ajaxCall';
import { useSelector } from 'react-redux';

const columns = [
  'No.',
  'Exam Name',
  'Exam Type',
  'No. of Questions',
  'Difficulty Level',
  // 'Meeting Id',
  // 'Meeting Password',
];

const PracticeTestList = () => {
  const [practiceTestData, setPracticeTestData] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const getPracticeTestData = async () => {
    try {
      const response = await ajaxCall(
        `/exam-blocks/`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'GET',
        },
        8000
      );
      if (response.status === 200) {
        setPracticeTestData(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getPracticeTestData();
  }, []);

  return (
    <div>
      <TopBar />
      <NavBar />
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='theme__shadow__circle'></div>
          <div className='theme__shadow__circle shadow__right'></div>
          <div className='dashboardarea sp_bottom_100'>
            <DSNavBar />
            <div className='dashboard'>
              <div className='container-fluid full__width__padding'>
                <div className='row'>
                  <DSSidebar />
                  <div className='col-xl-9 col-lg-9 col-md-12'>
                    <div className='dashboard__content__wraper'>
                      <div className='dashboard__section__title'>
                        <h4>Practice Test</h4>
                      </div>
                      <div className='dashboard__table table-responsive'>
                        <table>
                          <thead>
                            <tr>
                              {columns.map((column) => (
                                <th>{column}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {practiceTestData?.length >= 1 &&
                              practiceTestData?.map(
                                (practiceTestItem, index) => (
                                  <tr
                                    key={index + 1}
                                    className={`${
                                      index % 2 === 0
                                        ? ''
                                        : 'dashboard__table__row'
                                    }`}
                                  >
                                    <th>
                                      <div>{index + 1}.</div>
                                    </th>
                                    <td>{practiceTestItem?.exam_name}</td>
                                    <td>
                                      <div className='dashboard__table__star'>
                                        {practiceTestItem?.exam_type}
                                      </div>
                                    </td>
                                    <td>
                                      <div className='dashboard__table__star'>
                                        {practiceTestItem?.no_of_questions}
                                      </div>
                                    </td>
                                    <td>
                                      <div className='dashboard__table__star'>
                                        {practiceTestItem?.difficulty_level}
                                      </div>
                                    </td>
                                    {/* <td>
                                    <div className='dashboard__table__star'>
                                      {practiceTestItem?.soft_copy}
                                    </div>
                                  </td>
                                  <td>
                                    <div className='dashboard__table__star'>
                                      {practiceTestItem?.hard_copy}
                                    </div>
                                  </td> */}
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
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
    </div>
  );
};

export default PracticeTestList;
