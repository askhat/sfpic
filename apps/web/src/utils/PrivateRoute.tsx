import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { User } from "../context";

export function PrivateRoute({ children, ...props }: RouteProps) {
  let { isAuth } = useContext(User);

  return (
    <Route
      {...props}
      render={() => (isAuth ? children : <Redirect to="/welcome" />)}
    />
  );
}
