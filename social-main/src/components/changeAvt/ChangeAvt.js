import React, { useState, useEffect } from "react";
import "./changeAvt.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as Action from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function ChangeAvt(props) {
  const { changeAvtRequest, openChangeAvt, dataUser, getDataUrl, userHistory } =
    props;
  const cookies = new Cookies();
  const userCookies = cookies.get("username");
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [valueToast, setValueToast] = useState({
    text: null,
  });

  useEffect(() => {}, [dataUser]);

  const onCloseForm = () => {
    props.onCloseForm(false);
  };

  const callApiImage = (value) => {
    const formData = new FormData();
    let objectTemp = { id: dataUser?.id };
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        objectTemp = { ...objectTemp, imageSrc: response?.url };
        setShowLoading(true);
        changeAvtRequest(
          objectTemp,
          setShowLoading,
          userCookies,
          setValueToast,
          setOpenToast
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

  return (
    <div>
      {openToast && <SnackbarContent message={valueToast?.text} />}
      {showLoading && <GlobalLoading />}
      <div
        className="backgroundChangeAvt"
        onClick={isOpenForm ? () => onCloseForm() : null}
        id={openChangeAvt ? "showBackground" : "hiddenBackground"}
      >
        <div
          className="backgroundChangeAvt_form"
          onMouseEnter={() => setIsOpenForm(false)}
          onMouseLeave={() => setIsOpenForm(true)}
          id={openChangeAvt ? "showForm" : "hiddenForm"}
        >
          <img
            src={dataUser?.imageSrc}
            alt=""
            id="backgroundChangeAvt_form-img"
          />
          {userCookies === getDataUrl && (
            <label className="backgroundChangeAvt_form-edit">
              <input
                type="file"
                id="form_edit-input"
                onChange={handleChangeImage}
                style={{ opacity: 0 }}
              />
              <div className="form_edit-title">Chỉnh sửa</div>
            </label>
          )}
          {userCookies === userHistory && (
            <label className="backgroundChangeAvt_form-edit">
              <input
                type="file"
                id="form_edit-input"
                onChange={handleChangeImage}
                style={{ opacity: 0 }}
              />
              <div className="form_edit-title">Chỉnh sửa</div>
            </label>
          )}
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
      setOpenToast
    ) => {
      dispatch(
        Action.changeAvtRequest(
          response,
          setShowLoading,
          username,
          setValueToast,
          setOpenToast
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvt);
