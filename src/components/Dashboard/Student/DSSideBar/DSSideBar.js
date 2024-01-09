import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ajaxCall from '../../../../helpers/ajaxCall';
import { deleteFromLocalStorage } from '../../../../helpers/helperFunction';
import { useCheckAuth } from '../../../../hooks/useCheckAuth';

const DSSidebar = () => {
  const authData = useSelector((state) => state.authStore);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { logoutUser } = useCheckAuth();

  const getEnrolledCourses = async () => {
    try {
      const response = await ajaxCall(
        '/listofcoursewithpackage/',
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
        setEnrolledCourses(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('-----Error---->', error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <>
      <div className='col-xl-3 col-lg-3 col-md-12'>
        <div className='dashboard__inner sticky-top'>
          <div className='dashboard__nav__title'>
            <h6>Welcome, Micle Obema</h6>
          </div>
          <div className='dashboard__nav'>
            <ul>
              <li>
                <Link className='active' to='/dashboard/student-dashboard/'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-home'
                  >
                    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                    <polyline points='9 22 9 12 15 12 15 22'></polyline>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/course-lessons/23'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-courses'
                  >
                    <rect x='2' y='10' width='6' height='8'></rect>
                    <rect x='16' y='10' width='6' height='8'></rect>

                    <circle cx='6' cy='5' r='2'></circle>
                    <circle cx='12' cy='5' r='2'></circle>
                    <circle cx='18' cy='5' r='2'></circle>
                  </svg>
                  My Course
                </Link>
              </li>

              <li>
                {/* <Link to='/course-lessons/23'> */}
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-book-open'
                  >
                    <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'></path>
                    <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'></path>
                  </svg>
                  Course Material
                </Link>
              </li>

              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='feather feather-message-square'
                  >
                    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
                  </svg>
                  Assignments
                </Link>
                <span className='dashboard__label'>0</span>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-bookmark'
                  >
                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                  </svg>
                  Live Classes
                </Link>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-star'
                  >
                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                  </svg>
                  Full Length Test (Coming Soon){' '}
                  <span className='dashboard__label'>0</span>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-help-circle'
                  >
                    <circle cx='12' cy='12' r='10'></circle>
                    <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path>
                    <line x1='12' y1='17' x2='12.01' y2='17'></line>
                  </svg>
                  Practice Test (Coming Soon){' '}
                  <span className='dashboard__label'>0</span>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-shopping-bag'
                  >
                    <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                    <line x1='3' y1='6' x2='21' y2='6'></line>
                    <path d='M16 10a4 4 0 0 1-8 0'></path>
                  </svg>
                  Live Speaking Practice Session (Coming Soon){' '}
                  <span className='dashboard__label'>0</span>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-bookmark'
                  >
                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                  </svg>
                  Group Doubt Solving{' '}
                  <span className='dashboard__label'>0</span>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-bookmark'
                  >
                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                  </svg>
                  One To One Doubt Solving (Coming Soon){' '}
                  <span className='dashboard__label'>0</span>
                </Link>
              </li>
              <li>
                <Link to='/login' onClick={logout}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-volume-1'
                  >
                    <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>
                    <path d='M15.54 8.46a5 5 0 0 1 0 7.07'></path>
                  </svg>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='dashboard__inner sticky-top mt-4'>
          <div className='dashboard__nav__title'>
            <h6 className='mb-2'>Upcoming Live Class</h6>
          </div>
          <hr />
          <div className='dashboard__nav'>
            <div>Writing Task 1 - Letter Writing</div>
            <div className='d-flex justify-content-between'>
              <div>Tommorrow, 06:00 PM</div>
              <div>Add Reminder</div>
            </div>
          </div>
        </div>
        <div className='dashboard__inner sticky-top mt-4'>
          <div className='dashboard__nav__title'>
            <h6 className='mb-2'>Next Lesson Due</h6>
          </div>
          <hr />
          <div className='dashboard__nav'>
            <div>Writing Task 2 - Eassay Writing</div>
            <div className='d-flex justify-content-between'>
              <div>Lesson No. 7</div>
              <div>Take me to the lesson</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSSidebar;
