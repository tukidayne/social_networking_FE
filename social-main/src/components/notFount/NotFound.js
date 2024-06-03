import React from "react";
import "./notFount.css";
import _ from "lodash";
import { useHistory } from "react-router-dom";

function NotFound(props) {
  let history = useHistory();

  const handleGoBack = () => {
    history.push("/");
    !_.isEmpty(props) && props.onCloseFormNotFound(false);
  };

  return (
    <div>
      <div className="backgroundNotFound">
        <div className="backgroundNotFound_form">
          <div className="backgroundNotFound_form-top">
            <h1>Rất tiếc, trang này hiện không khả dụng</h1>
          </div>
          <div className="backgroundNotFound_form-body">
            {" "}
            <p>
              Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị
              gỡ.
            </p>
          </div>
          <div
            className="backgroundNotFound_form-bottom"
            onClick={() => handleGoBack()}
          >
            Quay lại DTOnstagram
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
