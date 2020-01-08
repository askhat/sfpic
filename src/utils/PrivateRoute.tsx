import React, { useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { User } from "~context";

export function PrivateRoute({ children, ...props }: RouteProps) {
  let user = useContext(User);

  return (
    <Route
      {...props}
      render={() => (user.isAuth ? children : <Redirect to="/welcome" />)}
    />
  );
}
