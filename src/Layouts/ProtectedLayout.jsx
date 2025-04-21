import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import BaseLayout from "./BaseLayout";

function ProtectedLayout({ children }) {
  const authUser = useSelector((state) => state.authUser);

  if (!authUser) return <Navigate to="/login" />;

  return <BaseLayout>{children}</BaseLayout>;
}

ProtectedLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedLayout;
