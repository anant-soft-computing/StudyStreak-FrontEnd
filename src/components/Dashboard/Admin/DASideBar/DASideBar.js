import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCheckAuth } from '../../../../hooks/useCheckAuth';

const DASideBar = () => {
  const location = useLocation().pathname;

  const { logoutUser } = useCheckAuth();

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <>
      <div className='col-xl-3 col-lg-3 col-md-12'>
        <div className='dashboard__inner sticky-top'>
          <div className='dashboard__nav__title'>
            <h6>Welcome, Admin</h6>
          </div>
          <div className='dashboard__nav'>
            <ul>
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-dashboard' ? 'active' : ''
                  }
                  to='/dashboard/admin-dashboard'
                >
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
                <Link
                  className={
                    location === '/dashboard/admin-package' ? 'active' : ''
                  }
                  to='/dashboard/admin-package'
                >
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
                  Package
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-course' ? 'active' : ''
                  }
                  to='/dashboard/admin-course'
                >
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
                  Course
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-exam' ? 'active' : ''
                  }
                  to='/dashboard/admin-exam'
                >
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
                    class='feather feather-exam'
                  >
                    <rect
                      x='3'
                      y='2'
                      width='18'
                      height='20'
                      rx='2'
                      ry='2'
                    ></rect>
                    <line x1='8' y1='2' x2='8' y2='22'></line>
                    <line x1='16' y1='2' x2='16' y2='22'></line>
                    <circle cx='12' cy='16' r='2'></circle>
                    <line x1='12' y1='16' x2='12' y2='18'></line>
                  </svg>
                  Exam
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-liveClass' ? 'active' : ''
                  }
                  to='/dashboard/admin-liveClass'
                >
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
                    class='feather feather-live-classes'
                  >
                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                    <polygon points='10 15 15 12 10 9 10 15'></polygon>
                  </svg>
                  LiveClass
                </Link>
              </li>
              <li>
                <Link
                  // className={
                  //   location === '/dashboard/admin-user' ? 'active' : ''
                  // }
                  to=''
                >
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
                    className='feather feather-user'
                  >
                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                    <circle cx='12' cy='7' r='4'></circle>
                  </svg>
                  Doubt Solving Sessions
                </Link>
              </li>
              {/* <li>
                <Link
                  className={
                    location === '/dashboard/admin-user' ? 'active' : ''
                  }
                  to='/dashboard/admin-user'
                >
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
                    className='feather feather-user'
                  >
                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                    <circle cx='12' cy='7' r='4'></circle>
                  </svg>
                  User
                </Link>
              </li> */}
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-counselling' ? 'active' : ''
                  }
                  to='/dashboard/admin-counselling'
                >
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
                  Counselling
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location === '/dashboard/admin-profile' ? 'active' : ''
                  }
                  to='/dashboard/admin-profile'
                >
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
                    className='feather feather-user'
                  >
                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                    <circle cx='12' cy='7' r='4'></circle>
                  </svg>
                  Settings
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
      </div>
    </>
  );
};

export default DASideBar;
