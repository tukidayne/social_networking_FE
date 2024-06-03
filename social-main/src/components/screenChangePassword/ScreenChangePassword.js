import React, { useEffect, useState } from "react";
import "./screenChangePassword.css";
import { connect } from "react-redux";
import { Alert } from "diginet-core-ui/components";
import * as actions from "../../redux/actions/Index";
import { CircularProgress } from "diginet-core-ui/components";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function ScreenChangePassword(props) {
  const { dataPersonal } = props;

  const [valueInput, setValueInput] = useState({
    password: "",
    againPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [valueToast, setValueToast] = useState({
    color: null,
    text: null,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showLoadingCirular, setShowLoadingCirular] = useState(false);

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "password":
        setValueInput({ ...valueInput, password: value });
        return;
      case "againPassword":
        setValueInput({ ...valueInput, againPassword: value });
        return;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    let objectTemp = { id: dataPersonal?.id };

    if (valueInput?.password !== valueInput?.againPassword) {
      setIsError(true);
      setOpenToast(true);
      setValueToast({
        text: "Mật khẩu nhập lại không trùng khớp, vui lòng thử lại",
      });
      setTimeout(() => {
        setOpenToast(false);
      }, 5000);
    } else {
      setIsError(false);
      objectTemp = { ...objectTemp, password: valueInput?.password };
      setShowLoadingCirular(true);
      props.changeAvtRequest(
        objectTemp,
        setShowLoading,
        dataPersonal?.username,
        setValueToast,
        setOpenToast,
        setShowLoadingCirular
      );
      setValueToast({
        password: "",
        againPassword: "",
      });
    }
  };

  return (
    <div className="backgroundChangePassword">
      <div
        style={{
          width: 150,
          position: "fixed",
          bottom: 70,
          left: 50,
        }}
      >
        {openToast && <SnackbarContent message={valueToast?.text} />}
      </div>
      <div className="backgroundChangePassword_top">
        <div className="backgroundChangePassword_top-left">
          <img src={dataPersonal?.imageSrc} id="top_left-img" alt="" />
        </div>
        <div className="backgroundChangePassword_top-right">
          {dataPersonal?.username}
        </div>
      </div>
      <div className="backgroundChangePassword_bottom">
        <div className="backgroundChangePassword_bottom-item">
          <div className="bottom_item-left">Mật khẩu mới</div>
          <div className="bottom_item-right">
            <input
              type="password"
              name="password"
              id="item_right-input"
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="backgroundChangePassword_bottom-item">
          <div className="bottom_item-left">Nhập lại mật khẩu mới</div>
          <div className="bottom_item-right">
            <input
              type="password"
              name="againPassword"
              id="item_right-input"
              placeholder="Nhập lại mật khẩu mới"
              onChange={(e) => handleChange(e)}
              style={isError ? { border: "1px solid red" } : null}
            />
            {showLoadingCirular && (
              <CircularProgress
                color="#f26e41"
                direction="bottom"
                percent={100}
                percentColor="#0095ff"
                size="extraSmall"
                strokeWidth={10}
              />
            )}
          </div>
        </div>
      </div>
      <div className="backgroundChangePassword_submit">
        <button
          className="backgroundChangePassword_submit-btn"
          onClick={() => handleSubmit()}
          disabled={valueInput?.againPassword === "" ? true : false}
        >
          Đồng ý
        </button>
        <button
          className="formSubmit_btn"
          // style={valueInput?.againPassword === ""}
          onClick={() => onCloseForm()}
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataPersonal: state.MyPersonal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAvtRequest: (
      response,
      setShowLoading,
      username,
      setValueToast,
      setOpenToast,
      setShowLoadingCirular
    ) => {
      dispatch(
        actions.changeAvtRequest(
          response,
          setShowLoading,
          username,
          setValueToast,
          setOpenToast,
          setShowLoadingCirular
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenChangePassword);
