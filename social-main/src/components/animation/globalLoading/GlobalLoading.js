import React from "react";
import "./globalLoading.css";

function GlobalLoading(props) {
  return (
    <div
      className="backGroundGlobalLoading"
    >
      <div className="_preloader" id="_preloader_loading">
        <div className="_item _item-1"></div>
        <div className="_item _item-2"></div>
        <div className="_item _item-3"></div>
        <div className="_item _item-4"></div>
      </div>
    </div>
  );
}

export default GlobalLoading;
