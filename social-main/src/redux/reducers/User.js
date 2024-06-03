import Cookies from "universal-cookie";
import * as Types from "../constants/ActionTypes";

let initialState = {
  dataUser: {
    data: null,
  },
  login: {
    messageIncorrect: "",
  },
  register: {
    messageUsernameAlready: "",
    messageEmailAlready: "",
    messageEmailUsernameAlready: "",
  },
  dataAllUser: [],
};

const authen = (state = initialState, action) => {
  const cookies = new Cookies();
  const history = action.history;

  switch (action.type) {
    case Types.LOGIN_USER:
      const data = action.data.data;
      if (data.error) {
        state.login.messageIncorrect = "Sai thông tin tài khoản hoặc mật khẩu!";
      }
      if (data.id) {
        cookies.set("imageSrc", data?.imageSrc);
        cookies.set("user", data?.id);
        cookies.set("username", data?.username);
        state.dataUser.data = data;
      }
      return state;
    case Types.REGISTER_USER:
      const dataRegister = action.data.data;
      if (dataRegister.error) {
        if (
          dataRegister.error.length === 1 &&
          dataRegister.error[0] === "Username"
        ) {
          state.register.messageUsernameAlready =
            "Tên người dùng đã được đăng ký!";
          return state;
        }
        if (
          dataRegister.error.length === 1 &&
          dataRegister.error[0] === "Email"
        ) {
          state.register.messageEmailAlready = "Email đã được đăng ký!";
          return state;
        }
        if (dataRegister.error.length === 2) {
          state.register.messageEmailUsernameAlready =
            "Email và tên người dùng đã được đăng ký!";
          return state;
        }
      }
      alert("Chúc mừng bạn đã đăng ký thành công! Quay lại đăng nhập ngay!");
      history.push("/login");

      return state;
    case Types.LOGOUT_USER:
      cookies.remove("user");
      cookies.remove("username");
      cookies.remove("imageSrc");
      action.setIsOpenHeader(false);
      state = {
        dataUser: {
          data: null,
        },
        login: {
          messageIncorrect: "",
        },
        register: {
          messageUsernameAlready: "",
          messageEmailAlready: "",
          messageEmailUsernameAlready: "",
        },
        dataAllUser: [],
      };
      return state;
    case Types.ALL_USER:
      const dataAllUser = action.data;
      state.dataAllUser = dataAllUser;
      return state;
    default:
      return state;
  }
};

export default authen;
