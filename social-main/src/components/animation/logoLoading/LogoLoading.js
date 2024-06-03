import React from "react";
import "./logoLoading.css";
import logo from "../../../uploads/animation/logo.png";

function LogoLoading(props) {
  return (
    <div>
      <div className="backgroundLogoLoading">
        <div className="backgroundLogoLoading_logo">
          <img src={logo} id="backgroundLogoLoading_logo" alt="no_img" />
        </div>
      </div>
    </div>
  );
}

export default LogoLoading;
