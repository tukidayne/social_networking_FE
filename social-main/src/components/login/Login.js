/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./login.css";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import * as Action from "../../redux/actions/Index";
import Register from "../register/Register";
import Logo from "../../uploads/img/logo.png";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function Login(props) {
  const { loginUserRequest, history, messageLogin } = props;
  const cookies = new Cookies();
  const [isLogin, setIsLogin] = useState(false);
  const [openUiRegister, setOpenUiRegister] = useState(false);
  const [valueInputEmail, setValueInputEmail] = useState("");
  const [valueInputPassword, setValueInputPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageIncorrect, setMessageIncorrect] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (cookies.get("user")) {
      setIsLogin(true);
      history.push("/");
    } else {
      setMessageIncorrect(messageLogin.messageIncorrect);
      setIsLogin(false);
    }
  }, [cookies, history, messageLogin.messageIncorrect]);

  const openFormRegister = () => {
    setOpenUiRegister(true);
  };

  const closeForm = () => {
    setOpenUiRegister(false);
  };

  const changeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setMessageIncorrect("");
      setValueInputEmail(value);
      if (value !== "") {
        if (!validateEmail(value)) {
          setMessageEmail("Email phải nhập đúng định dạng!");
        } else {
          setMessageEmail("");
        }
      } else {
        setMessageEmail("Email không được bỏ trống!");
      }
    } else {
      setMessageIncorrect("");
      setValueInputPassword(value);
      if (value !== "") {
        if (value.length < 8) {
          setMessagePassword("Mật khẩu phải lớn hơn hoặc bằng 8 kí tự");
        } else {
          setMessagePassword("");
        }
      } else {
        setMessagePassword("Mật khẩu không được bỏ trống!");
      }
    }
  };

  const handleSubmitForm = () => {
    if (valueInputEmail === "") {
      setMessageEmail("Email không được bỏ trống!");
    }
    if (valueInputPassword === "") {
      setMessagePassword("Password không được bỏ trống!");
    }
    if (
      valueInputEmail !== "" &&
      valueInputPassword !== "" &&
      messageEmail === "" &&
      messagePassword === ""
    ) {
      setShowLoading(true);
      loginUserRequest(
        valueInputEmail,
        valueInputPassword,
        history,
        setShowLoading
      );
    }
  };

  return (
    <div style={isLogin ? { display: "none" } : { display: "block" }}>
      {showLoading && <GlobalLoading />}
      <div className="container">
        <div className="container_content">
          <div className="containerContent_left">
            <div className="containerContent_left-logo">
              <img src={Logo} alt="" id="containerContent_left-logo" />
            </div>
            <div className="containerContent_left-title">
              <h3 id="containerContent_left-title">
                DTOnstagram giúp bạn kết nối và chia sẻ với mọi người trong cuộc
                sống của bạn.
              </h3>
            </div>
          </div>
          <div className="containerContent_right">
            <div className="containerContent_right-top">
              <div className="right_top-form">
                {
                  <p id="error" style={{ textAlign: "center" }}>
                    {messageIncorrect ? messageIncorrect : null}
                  </p>
                }
                <input
                  type="email"
                  name="email"
                  id="top_form-input"
                  placeholder="Email"
                  onChange={changeData}
                  style={
                    messageEmail || messageIncorrect
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {<p id="error">{messageEmail ? messageEmail : null}</p>}
                <input
                  type="password"
                  name="password"
                  id="top_form-input"
                  placeholder="Mật khẩu"
                  onChange={changeData}
                  style={
                    messagePassword || messageIncorrect
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {<p id="error">{messagePassword ? messagePassword : null}</p>}
                <button
                  id="top_form-buttonLogin"
                  onClick={() => handleSubmitForm()}
                >
                  Đăng nhập
                </button>
                <div className="forgotPassword">
                  <a href="#" id="top_form-forgotPassword">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="registerUser">
                  <button
                    id="top_form-buttonRegister"
                    onClick={() => openFormRegister()}
                  >
                    Tạo tài khoản mới
                  </button>
                </div>
              </div>
            </div>
            <div className="containerContent_right-bottom"></div>
          </div>
        </div>
      </div>
      <Register
        openUiRegister={openUiRegister}
        closeForm={closeForm}
        history={history}
      />
    </div>
  );

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

const mapStateToProps = (state) => {
  return {
    messageLogin: state.User.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserRequest: (
      valueInputEmail,
      valueInputPassword,
      history,
      setShowLoading
    ) => {
      dispatch(
        Action.loginUserRequest(
          valueInputEmail,
          valueInputPassword,
          history,
          setShowLoading
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
