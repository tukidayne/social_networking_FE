import React, { useState } from "react";
import "./screenEditPersonal.css";
import { connect } from "react-redux";
import { Alert } from "diginet-core-ui/components";
import * as Action from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "diginet-core-ui/components";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function ScreenEditPersonal(props) {
  const { changeAvtRequest, dataUser } = props;
  let history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [dataInput, setDataInput] = useState({
    name: "",
    username: "",
    description: "",
  });
  const [valueToast, setValueToast] = useState({
    text: null,
  });
  const [openToast, setOpenToast] = useState(false);
  const [showLoadingCirular, setShowLoadingCirular] = useState(false);
  const [key, setKey] = useState("");

  const callApiImage = (value) => {
    const formData = new FormData();
    let objectTemp = {
      id: dataUser?.id,
    };
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        objectTemp = { ...objectTemp, imageSrc: response.url };
        setShowLoading(true);
        changeAvtRequest(
          objectTemp,
          setShowLoading,
          dataUser?.username,
          setValueToast,
          setOpenToast,
          setShowLoadingCirular
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeImage = (e) => {
    const value = e.target.files;
    setShowLoading(true);
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        callApiImage(value[i]);
      }
    } else {
      callApiImage(value[0]);
    }
  };

  const onCloseForm = () => {
    props.onCloseForm(false);
    history.push(`/personal/${dataUser?.username}`);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "name":
        setDataInput({ ...dataInput, name: value });
        return;
      case "username":
        setDataInput({ ...dataInput, username: value });
        return;
      case "description":
        setDataInput({ ...dataInput, description: value });
        return;
      default:
        return;
    }
  };

  const handleSubmit = (key) => {
    setShowLoadingCirular(true);
    let objectTemp = {
      id: dataUser?.id,
    };

    switch (key) {
      case "name":
        if (dataInput.name !== "") {
          setKey(key);
          objectTemp = { ...objectTemp, name: dataInput.name };
          changeAvtRequest(
            objectTemp,
            setShowLoading,
            dataUser?.username,
            setValueToast,
            setOpenToast,
            setShowLoadingCirular
          );
          setDataInput({ ...dataInput, name: "" });
        }
        return;
      case "username":
        if (dataInput.username !== "") {
          setKey(key);
          objectTemp = { ...objectTemp, username: dataInput.username };
          changeAvtRequest(
            objectTemp,
            setShowLoading,
            dataUser?.username,
            setValueToast,
            setOpenToast,
            setShowLoadingCirular
          );
          setDataInput({ ...dataInput, username: "" });
        }
        return;
      case "description":
        if (dataInput.description !== "") {
          setKey(key);
          objectTemp = { ...objectTemp, description: dataInput.description };
          changeAvtRequest(
            objectTemp,
            setShowLoading,
            dataUser?.username,
            setValueToast,
            setOpenToast,
            setShowLoadingCirular
          );
          setDataInput({ ...dataInput, description: "" });
        }
        return;
      default:
        return;
    }
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
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

      <div className="backgroundEditPersonal_all">
        <div className="form_right-avt">
          <div className="right_avt-top">
            <div className="avt_top-left">Ảnh đại diện</div>
            <label className="avt_top-right">
              <input
                type="file"
                id="avt_top-right"
                onChange={handleChangeImage}
                style={{ opacity: 0 }}
              />
              <div className="avt_top-right-title">Chỉnh sửa</div>
            </label>
          </div>
          <div className="right_avt-bottom">
            <img src={dataUser?.imageSrc} id="avt_bottom-img" alt="" />
          </div>
        </div>
        <div className="form_right-name">
          <div className="right_name-top">
            <div className="name_top-left">Tên ( {dataUser?.name} ) </div>
          </div>
          <div className="right_name-bottom">
            <input
              type="text"
              name="name"
              id="bottom_right-input"
              placeholder="Nhập tên của bạn..."
              onChange={(e) => handleChange(e)}
              value={dataInput?.name}
            />
            {showLoadingCirular && key === "name" && (
              <CircularProgress
                color="#f26e41"
                direction="bottom"
                percent={100}
                percentColor="#0095ff"
                size="extraSmall"
                strokeWidth={10}
                style={{ marginLeft: -50 }}
              />
            )}
            <div
              className="formSubmit_btn"
              onClick={() => handleSubmit("name")}
            >
              {" "}
              Cập nhật
            </div>
          </div>
        </div>
        <div className="form_right-username">
          <div className="right_username-top">
            <div className="username_top-left">
              Tên người dùng ( {dataUser?.username} )
            </div>
          </div>
          <div className="right_username-bottom">
            <input
              type="text"
              name="username"
              id="bottom_right-input"
              placeholder="Nhập tên người dùng của bạn..."
              onChange={(e) => handleChange(e)}
              value={dataInput?.username}
            />
            {showLoadingCirular && key === "username" && (
              <CircularProgress
                color="#f26e41"
                direction="bottom"
                percent={100}
                percentColor="#0095ff"
                size="extraSmall"
                strokeWidth={10}
                style={{ marginLeft: -50 }}
              />
            )}
            <div
              className="formSubmit_btn"
              onClick={() => handleSubmit("username")}
            >
              {" "}
              Cập nhật
            </div>
          </div>
        </div>
        <div className="form_right-description">
          <div className="right_description-top">
            <div className="description_top-left">Tiểu sử</div>
          </div>
          <div className="right_description-bottom">
            <textarea
              id="description_bottom-textarea"
              name="description"
              placeholder="Nhập tiểu sử của bạn..."
              onChange={(e) => handleChange(e)}
              value={dataInput?.description}
            />
            {showLoadingCirular && key === "description" && (
              <CircularProgress
                color="#f26e41"
                direction="bottom"
                percent={100}
                percentColor="#0095ff"
                size="extraSmall"
                strokeWidth={10}
                style={{ marginLeft: -50 }}
              />
            )}
            <div
              className="formSubmit_btn"
              onClick={() => handleSubmit("description")}
            >
              {" "}
              Cập nhật
            </div>
          </div>
        </div>
        <div className="background_formSubmit">
          <div
            className="formSubmit_btn"
            onClick={() => onCloseForm()}
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            Hủy bỏ
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.MyPersonal,
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
        Action.changeAvtRequest(
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEditPersonal);
