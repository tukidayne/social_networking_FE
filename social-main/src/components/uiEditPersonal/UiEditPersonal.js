import React, { useState } from "react";
import "./uiEditPersonal.css";
import { connect } from "react-redux";
import ScreenEditPersonal from "../screenEditPersonal/ScreenEditPersonal";
import ScreenChangePassword from "../screenChangePassword/ScreenChangePassword";

function UiEditPersonal(props) {
  const { openEditPersonal } = props;
  const [showValueId, setShowValueId] = useState(1);

  let value = [
    {
      id: 1,
      name: "Chỉnh sửa thông tin cá nhân",
    },
    {
      id: 2,
      name: "Thay đổi mật khẩu",
    },
  ];

  const showContentId = (id) => {
    setShowValueId(id);
  };

  const onCloseForm = (e) => {
    props.onCloseForm(e);
  };

  const showContent = () => {
    switch (showValueId) {
      case 1:
        return <ScreenEditPersonal onCloseForm={onCloseForm} />;
      case 2:
        return <ScreenChangePassword onCloseForm={onCloseForm} />;
      default:
        return <ScreenEditPersonal onCloseForm={onCloseForm} />;
    }
  };

  return (
    <div style={openEditPersonal ? { display: "block" } : { display: "none" }}>
      <div className="backgroundEditPersonal">
        <div className="backgroundEditPersonal_form">
          <div className="backgroundEditPersonal_form-left">
            <div className="form_left-about">Giới thiệu</div>
            {value.map((item, index) => {
              return (
                <div
                  key={index}
                  className="form_left-title"
                  onClick={() => showContentId(item.id)}
                  style={
                    showValueId === index + 1
                      ? { backgroundColor: "#e7f3ff", color: "#188af5" }
                      : {
                          backgroundColor: "rgb(228 230 235 / 35%)",
                          color: "#050505",
                        }
                  }
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="backgroundEditPersonal_form-right">
            {showContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.Personal,
  };
};

export default connect(mapStateToProps, null)(UiEditPersonal);
