import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./uiAddNews.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Popup } from "diginet-core-ui/components";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

let arrTemp = [];

function AddNews(props) {
  const {
    personal,
    openFromAddNews,
    setOpenFormAddNews,
    dataDetailPost,
    setOpenUiUpdatePost,
    setOpenToast,
    setValueToast,
  } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const idUser = cookies.get("user");
  const [img, setImg] = useState([]);
  const [content, setContent] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [dataPost, setDataPost] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [popupNotification, setPopupNotification] = useState(false);

  useEffect(() => {
    if (isRender) {
      if (dataDetailPost) {
        dataDetailPost?.imageSrc.forEach((image) => {
          arrTemp.push(image);
        });
        setContent(dataDetailPost?.content);
      }
      setImg(arrTemp);
    }
    dataDetailPost === undefined
      ? setDataPost(personal)
      : setDataPost(dataDetailPost);
    setIsRender(false);
  }, [dataDetailPost, isRender, img, cookies, personal]);

  const onCloseForm = () => {
    props.onCloseForm(false);
    setImg([]);
    setContent("");
    arrTemp = [];
  };

  const callApiImage = (value) => {
    const formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("https://api.Cloudinary.com/v1_1/baby-dont-cry/image/upload", options)
      .then((response) => response.json())
      .then((response) => {
        arrTemp.push(response.url);
        setImg(arrTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeImage = async (e) => {
    const value = e.target.files;
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        callApiImage(value[i]);
      }
    } else {
      callApiImage(value[0]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleSubmit = () => {
    if (_.isEmpty(img)) {
      setPopupNotification(true);
    } else {
      setShowLoading(true);
      dataDetailPost === undefined
        ? props.postNewsRequest(
            idUser,
            img,
            content,
            setShowLoading,
            setOpenFormAddNews,
            setOpenToast,
            setValueToast
          )
        : props.updatePostRequest(
            dataDetailPost?.id_post,
            img,
            content,
            setShowLoading,
            setOpenFormAddNews,
            setOpenUiUpdatePost,
            idUser,
            setOpenToast,
            setValueToast
          );
      setContent("");
      setImg([]);
      arrTemp = [];
    }
  };

  const handleRemoveImage = (image) => {
    let arrImgClone = [...arrTemp];
    const results = arrImgClone.findIndex((img) => img === image);
    arrImgClone.splice(results, 1);
    setImg(arrImgClone);
    arrTemp = arrImgClone;
  };

  return (
    <div
      className="backgroundAddfr"
      style={
        openFromAddNews
          ? { transform: "translateY(0%)" }
          : { transform: "translateY(100%)", transitionDelay: ".5s" }
      }
    >
      {popupNotification && (
        <Popup
          fullScreen
          icon="warning"
          onClose={function noRefCheck() {
            setPopupNotification(false);
          }}
          open
          pressESCToClose
          title="Hình ảnh đăng lên là bắt buộc, yêu cầu người dùng bổ sung"
        />
      )}
      {showLoading && <GlobalLoading />}
      <div
        className="backgroundAddfr_form"
        style={
          openFromAddNews
            ? { transform: "translateY(0%)", transition: "0.5s" }
            : { transform: "translateY(175%)", transition: "0.5s" }
        }
        id={img.length !== 0 ? "largeForm" : "smallForm"}
      >
        <div className="backgroundAddfr_form-top">
          {dataDetailPost ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
          <i
            className="fas fa-times"
            id="formAddfr_top-close"
            onClick={() => onCloseForm()}
          ></i>
        </div>
        <div className="backgroundAddfr_form-body">
          <div className="form_body-top">
            <div className="body_top-img">
              <img
                src={
                  dataPost?.accountImage
                    ? dataPost?.accountImage
                    : dataPost?.imageSrc
                }
                alt=""
                id="body_top-img"
              />
            </div>
            <div className="body_top-name">
              <p>{dataPost?.username}</p>
            </div>
          </div>
          <div className="form_body-body">
            <textarea
              name=""
              id="form_body-textarea"
              cols="30"
              rows="10"
              onChange={(e) => handleChange(e)}
              placeholder={`${personal?.name} ơi, bạn đang nghĩ gì thế ?`}
              value={content}
            ></textarea>
          </div>
          {img.length !== 0 ? (
            <div className="img_loading">
              {img?.length > 1 ? (
                img?.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="img_loading-column"
                      style={{ maxWidth: "50%" }}
                    >
                      <img src={value} id="img_loading" alt="" />
                      <i
                        className="fas fa-times"
                        id="remove_image"
                        onClick={() => handleRemoveImage(value)}
                      ></i>
                    </div>
                  );
                })
              ) : (
                <div
                  className="img_loading-column"
                  style={{ maxWidth: "100%" }}
                >
                  <img src={img[0]} id="img_loading" alt="" />
                  <i
                    className="fas fa-times"
                    id="remove_image"
                    onClick={() => handleRemoveImage(img[0])}
                  ></i>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className="backgroundAddfr_bottom">
          <div className="form_body-bottom">
            <label htmlFor="body_bottom-button">
              <input
                type="file"
                id="body_bottom-button"
                onChange={handleChangeImage}
                multiple="multiple"
              />
              <i className="fas fa-photo-video" id="body_bottom-icon"></i> Thêm
              hình ảnh
            </label>
          </div>
          <div className="backgroundAddfr_form-bottom">
            <button id="form_bottom-button" onClick={() => handleSubmit()}>
              Đăng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    personal: state.MyPersonal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postNewsRequest: (
      id,
      img,
      content,
      setShowLoading,
      setOpenFormAddNews,
      setOpenToast,
      setValueToast
    ) => {
      dispatch(
        actions.postNewRequest(
          id,
          img,
          content,
          setShowLoading,
          setOpenFormAddNews,
          setOpenToast,
          setValueToast
        )
      );
    },
    updatePostRequest: (
      id,
      img,
      content,
      setShowLoading,
      setOpenFormAddNews,
      setOpenUiUpdatePost,
      idUser,
      setOpenToast,
      setValueToast
    ) => {
      dispatch(
        actions.updatePostRequest(
          id,
          img,
          content,
          setShowLoading,
          setOpenFormAddNews,
          setOpenUiUpdatePost,
          idUser,
          setOpenToast,
          setValueToast
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
