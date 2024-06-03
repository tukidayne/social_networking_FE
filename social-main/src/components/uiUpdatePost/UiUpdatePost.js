import React, { useState } from "react";
import "./uiUpdatePost.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Index";
import UiAddNews from "../uiAddNews/UiAddNews";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function UiUpdatePost(props) {
  const {
    dataDetailPost,
    setOpenUiUpdatePost,
    setOpenDetailsPost,
    setOpenToast,
    setValueToast,
  } = props;
  const [showLoading, setShowLoading] = useState(false);
  const [openFromAddNews, setOpenFormAddNews] = useState(false);

  const onCloseForm = () => {
    props.onCloseForm(false);
    setOpenFormAddNews(false);
  };

  const openEditPost = () => {
    setOpenFormAddNews(true);
  };

  const deletePost = () => {
    setShowLoading(true);
    props.deletePostRequest(
      dataDetailPost?.id_post,
      dataDetailPost?.id_account,
      setOpenUiUpdatePost,
      setOpenDetailsPost,
      setShowLoading,
      setOpenToast,
      setValueToast
    );
  };

  return (
    <div>
      <UiAddNews
        openFromAddNews={openFromAddNews}
        onCloseForm={onCloseForm}
        dataDetailPost={dataDetailPost}
        setOpenFormAddNews={setOpenFormAddNews}
        setOpenUiUpdatePost={setOpenUiUpdatePost}
        setOpenToast={setOpenToast}
        setValueToast={setValueToast}
      />
      {showLoading && <GlobalLoading />}
      <div className="backgroundUpdatePost">
        <div className="backgroundUpdatePost_form">
          <div
            className="backgroundUpdatePost_form-item"
            style={{ fontWeight: "bold", color: "red" }}
            onClick={() => deletePost()}
          >
            Xóa
          </div>
          <div
            className="backgroundUpdatePost_form-item"
            onClick={() => openEditPost()}
          >
            Chỉnh sửa bài viết
          </div>
          <div
            className="backgroundUpdatePost_form-item"
            onClick={() => onCloseForm()}
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePostRequest: (
      idPost,
      idAccount,
      setOpenUiUpdatePost,
      setOpenDetailsPost,
      setShowLoading,
      setOpenToast,
      setValueToast
    ) => {
      dispatch(
        actions.deletePostRequest(
          idPost,
          idAccount,
          setOpenUiUpdatePost,
          setOpenDetailsPost,
          setShowLoading,
          setOpenToast,
          setValueToast
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(UiUpdatePost);
