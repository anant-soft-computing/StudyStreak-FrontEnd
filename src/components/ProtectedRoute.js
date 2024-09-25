import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCheckAuth } from "../hooks/useCheckAuth";
import Loading from "../components/UI/Loading";

const ProtectedRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authStore);

  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth, dispatch]);

  if (authData?.authLoading) {
    return <Loading />;
  }

  if (!authData?.loggedIn) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};

export default ProtectedRoute;
