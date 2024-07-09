import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { useCheckAuth } from "../hooks/useCheckAuth";

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authStore);

  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth, dispatch]);

  if (authData?.authLoading) {
    return <Loading color="primary" text="Loading ..." />;
  }

  if (!authData?.loggedIn) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};

export default ProtectedRoute;
