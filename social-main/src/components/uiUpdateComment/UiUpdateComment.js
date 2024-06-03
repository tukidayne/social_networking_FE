import React, { useState } from "react";
import "../uiUpdatePost/uiUpdatePost.css";
import { connect } from "react-redux";
import UiAddNews from "../uiAddNews/UiAddNews";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function UiUpdateComment(props) {
  const {
    dataDetailPost,
    setOpenUiUpdatePost,
    dataCommentPost,
    setOpenUpdateCmt,
    setOpenToastDetails,
    setValueToastDetails,
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

  const removeComment = () => {
    setShowLoading(true);
    props.removeCommentRequest(
      dataDetailPost?.id_post,
      dataCommentPost?.id_account,
      dataCommentPost?.id_comment,
      dataCommentPost?.id_reply,
      setOpenUpdateCmt,
      setShowLoading,
      setOpenToastDetails,
      setValueToastDetails
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
      />
      {showLoading && <GlobalLoading />}
      <div className="backgroundUpdatePost">
        <div className="backgroundUpdatePost_form">
          <div
            className="backgroundUpdatePost_form-item"
            style={{ fontWeight: "bold", color: "red" }}
            onClick={() => removeComment()}
          >
            Xóa
          </div>
          <div
            className="backgroundUpdatePost_form-item"
            onClick={() => openEditPost()}
          >
            Chỉnh sửa bình luận
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
    removeCommentRequest: (
      idPost,
      idAccount,
      idComment,
      idReply,
      setOpenUpdateCmt,
      setShowLoading,
      setOpenToastDetails,
      setValueToastDetails
    ) => {
      dispatch(
        actions.removeCommentRequest(
          idPost,
          idAccount,
          idComment,
          idReply,
          setOpenUpdateCmt,
          setShowLoading,
          setOpenToastDetails,
          setValueToastDetails
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(UiUpdateComment);
