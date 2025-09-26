import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Auth = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const { login } = useSelector((state) => state.login);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Auth;