import React, { useState } from "react";
import "./uiEditChat.css";
import logo from "../../uploads/img/duc.jpg";

function UiEditChat(props) {
  const { isOpenEditChat } = props;

  const [openFormChangeName, setOpenFormChangeName] = useState(false);

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  const handleOpenFromChangeName = () => {
    setOpenFormChangeName(true);
  };

  const handleCloseFormChangeName = () => {
    setOpenFormChangeName(false);
  };

  return (
    <div style={isOpenEditChat ? { display: "block" } : { display: "none" }}>
      <div
        className="backgroundEditName"
        style={openFormChangeName ? { display: "block" } : { display: "none" }}
      >
        <div className="backgroundEditName_form">
          <input
            type="text"
            name="name"
            id="editName_input"
            placeholder="Nhập tên...."
          />
          <i
            className="fas fa-times"
            id="formChageName_close"
            onClick={() => handleCloseFormChangeName()}
          ></i>
        </div>
      </div>

      <div className="backgroundEditChat">
        <div className="backgroundEditChat_form">
          <div className="backgroundEditChat_form-top">Thông tin chi tiết</div>
          <div className="backgroundEditChat_form-body">
            <div className="formEditChat_body-top">Thành viên</div>
            <div className="formEditChat_body-bottom">
              <div className="fromEditChat_wrapper">
                <div className="bodyEditChat_bottom-item">
                  <div className="bottomEditChat_item-left">
                    <img src={logo} id="itemLeft_img" alt="" />
                  </div>
                  <div className="bottomEditChat_item-right">
                    <div className="itemEditChat_right-top">aaaa</div>
                    <div className="itemEditChat_right-bottom">aaaa</div>
                  </div>
                  <i className="far fa-edit" id="bottomEditChat_item-edit"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="backgroundEditChat_form-bottom">
            <div
              className="formEditChat_bottom-item"
              onClick={() => handleOpenFromChangeName()}
            >
              Sửa tên đoạn chat
            </div>
            <div
              className="formEditChat_bottom-item"
              style={{ fontWeight: "bold", color: "red" }}
            >
              Rời khỏi nhóm
            </div>
            <div
              className="formEditChat_bottom-item"
              onClick={() => onCloseForm()}
            >
              Hủy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UiEditChat;
