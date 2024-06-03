import React from "react";
import Login from "../../components/login/Login";

function LoginPage(props) {
  const { history } = props;
  return (
    <div className="container">
      <Login history={history} />
    </div>
  );
}

export default LoginPage;
