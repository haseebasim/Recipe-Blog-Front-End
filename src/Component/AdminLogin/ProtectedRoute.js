import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (window.sessionStorage.getItem("isAdminLogedIn")) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  }
  else{
      window.location = `/home`;
  }
};

export default ProtectedRoute;
