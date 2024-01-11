import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import logo from '../img/logo/Logo.png';
import { useCheckAuth } from '../hooks/useCheckAuth';

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authStore);

  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [authData, dispatch]);

  if (authData.authLoading) {
    return (
      <div id='back__preloader'>
        <div id='back__circle_loader'></div>
        <div className='back__loader_logo'>
          <img
            loading='lazy'
            src={logo}
            alt='Preload'
            height={22}
            width='100%'
          />
        </div>
      </div>
    );
  }

  if (!authData.loggedIn) {
    return <Navigate to='/login' />;
  }
  return <Element />;
};

export default ProtectedRoute;
