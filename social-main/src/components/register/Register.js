import React, { useState, useEffect } from "react";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import "./register.css";
import { connect } from "react-redux";
import * as Action from "../../redux/actions/Index";

function Register(props) {
  const { registerUserRequest, openUiRegister, history, messageRegister } =
    props;
  const [valueInputName, setValueInputName] = useState("");
  const [valueInputUsername, setValueInputUsername] = useState("");
  const [valueInputEmail, setValueInputEmail] = useState("");
  const [valueInputPassword, setValueInputPassword] = useState("");
  const [valueInputAgainPassword, setValueInputAgainPassword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageUsername, setMessageUsername] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageAgainPassword, setMessageAgainPassword] = useState("");
  const [messageIncorrectUsername, setMessageIncorrectUsername] = useState("");
  const [messageIncorrectEmail, setMessageIncorrectEmail] = useState("");
  const [messageIncorrectEmailUsername, setMessageIncorrectEmailUsername] =
    useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setMessageIncorrectEmail(messageRegister.messageEmailAlready);
    setMessageIncorrectUsername(messageRegister.messageUsernameAlready);
    setMessageIncorrectEmailUsername(
      messageRegister.messageEmailUsernameAlready
    );
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name") {
      setValueInputName(value);
      messageName !== "" ? setMessageName("") : setMessageName(messageName);
    }
    if (name === "username") {
      setMessageIncorrectUsername("");
      setValueInputUsername(value);
      messageUsername !== ""
        ? setMessageUsername("")
        : setMessageUsername(messageUsername);
    }
    if (name === "email") {
      setMessageIncorrectEmail("");
      setValueInputEmail(value);
      value !== ""
        ? validateEmail(value)
          ? setMessageEmail("")
          : setMessageEmail(
              "Email phải nhập đúng định dạng ( exp: abc@gmail.com )"
            )
        : setMessageEmail("");
    }
    if (name === "password") {
      setValueInputPassword(value);
      value !== ""
        ? value.length >= 8
          ? setMessagePassword("")
          : setMessagePassword(
              "Password phải lớn hơn hoặc bằng 8 ký tự ( exp: 12345678 )"
            )
        : setMessagePassword("");
    }
    if (name === "againPassword") {
      setValueInputAgainPassword(value);
      value !== ""
        ? value === valueInputPassword
          ? setMessageAgainPassword("")
          : setMessageAgainPassword("Mật khẩu nhập lại không trùng khớp!")
        : setMessageAgainPassword("");
    }
  };

  const handleSubmitForm = () => {
    if (valueInputName === "") {
      setMessageName("Mật khẩu không được bỏ trống!");
    }
    if (valueInputUsername === "") {
      setMessageUsername("Username không được bỏ trống");
    }
    if (valueInputEmail === "") {
      setMessageEmail("Email không được bỏ trống!");
    }
    if (valueInputPassword === "") {
      setMessagePassword("Mật khẩu không được để trống!");
    }
    if (valueInputAgainPassword === "") {
      setMessageAgainPassword("Nhập lại mật khẩu không được bỏ trống ");
    }
    if (
      valueInputName !== "" &&
      valueInputUsername !== "" &&
      valueInputEmail !== "" &&
      valueInputPassword !== "" &&
      valueInputAgainPassword !== ""
    ) {
      setShowLoading(true);
      registerUserRequest(
        valueInputName,
        valueInputUsername,
        valueInputEmail,
        valueInputPassword,
        history,
        setShowLoading
      );
    }
  };

  const closeForm = () => {
    props.closeForm(false);
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      <div
        className="backgroundRegister"
        style={
          openUiRegister
            ? { transform: "translateY(0%)" }
            : { transform: "translateY(135%)", transitionDelay: "0.3s" }
        }
      >
        <div
          className="backgroundRegister_form"
          id={
            messageName ||
            messageUsername ||
            messageEmail ||
            messagePassword ||
            messageAgainPassword
              ? "largeFormRegister"
              : "smallFormRegister"
          }
          style={
            openUiRegister
              ? { transform: "translateY(0%)", transition: "0.3s" }
              : { transform: "translateY(135%)", transition: "0.3s" }
          }
        >
          <div className="backgroundRegister_form-top">
            <div className="form_top-left">
              <h2 id="form_top-h2">Đăng ký</h2>
              <p id="form_top-p">Nhanh chóng và dễ dàng.</p>
            </div>
            <div className="form_top-right">
              <i
                className="fas fa-times"
                id="form_top-iconClose"
                onClick={() => closeForm()}
              ></i>
            </div>
          </div>
          <div className="backgroundRegister_form-body">
            <input
              type="text"
              name="name"
              id="form_body-input"
              placeholder="Họ và tên"
              onChange={handleChangeInput}
              style={messageName ? { border: "1px solid red" } : null}
            />
            {<p id="error">{messageName ? messageName : null}</p>}
            <input
              type="text"
              name="email"
              id="form_body-input"
              placeholder="Email"
              onChange={handleChangeInput}
              style={
                messageEmail ||
                messageIncorrectEmail ||
                messageIncorrectEmailUsername
                  ? { border: "1px solid red" }
                  : null
              }
            />
            {
              <p id="error">
                {messageIncorrectEmail ? messageIncorrectEmail : null}
              </p>
            }
            {
              <p id="error">
                {messageIncorrectEmailUsername
                  ? messageIncorrectEmailUsername
                  : null}
              </p>
            }
            {<p id="error">{messageEmail ? messageEmail : null}</p>}
            <input
              type="text"
              name="username"
              id="form_body-input"
              placeholder="Username"
              onChange={handleChangeInput}
              style={
                messageUsername ||
                messageIncorrectUsername ||
                messageIncorrectEmailUsername
                  ? { border: "1px solid red" }
                  : null
              }
            />
            {
              <p id="error">
                {messageIncorrectUsername ? messageIncorrectUsername : null}
              </p>
            }
            {
              <p id="error">
                {messageIncorrectEmailUsername
                  ? messageIncorrectEmailUsername
                  : null}
              </p>
            }

            {<p id="error">{messageUsername ? messageUsername : null}</p>}
            <input
              type="password"
              name="password"
              id="form_body-input"
              placeholder="Mật khẩu"
              onChange={handleChangeInput}
              style={messagePassword ? { border: "1px solid red" } : null}
            />
            {<p id="error">{messagePassword ? messagePassword : null}</p>}
            <input
              type="password"
              name="againPassword"
              id="form_body-input"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChangeInput}
              style={messageAgainPassword ? { border: "1px solid red" } : null}
            />
            {
              <p id="error">
                {messageAgainPassword ? messageAgainPassword : null}
              </p>
            }
            <p id="form_body-p">
              Bằng cách nhấp vào đăng ký, bạn đồng ý với điều khoản, chính sách
              dữ liệu và Chính sách cookie của chúng tôi. Bạn có thể nhận được
              thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
            </p>
          </div>
          <div className="backgroundRegister_form-bottom">
            <button
              id="form_bottom-buttonRegister"
              onClick={() => handleSubmitForm()}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
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
    messageRegister: state.User.register,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    registerUserRequest: (
      valueInputName,
      valueInputUsername,
      valueInputEmail,
      valueInputPassword,
      history,
      setShowLoading
    ) => {
      dispatch(
        Action.registerUserRequest(
          valueInputName,
          valueInputUsername,
          valueInputEmail,
          valueInputPassword,
          history,
          setShowLoading
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
