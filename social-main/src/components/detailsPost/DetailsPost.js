/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./detailsPost.css";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import TimeStamp from "../../timeStamp";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ReactHtmlParser from "react-html-parser";
import * as actions from "../../redux/actions/Index";
import UiUpdatePost from "../uiUpdatePost/UiUpdatePost";
import CardLoading from "../animation/cardLoading/CardLoading";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import UiUpdateComment from "../uiUpdateComment/UiUpdateComment";
import { CircularProgress, LinearProgress } from "diginet-core-ui/components";
import NotFound from "./../notFount/NotFound";

function DetailsPost(props) {
  const {
    dataDetailsPost,
    getDetailPost,
    typePost,
    setOpenDetailsPost,
    setOpenToast,
    setValueToast,
  } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [likePost, setLikePost] = useState([]);
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [contentMessage, setContentMessage] = useState("");
  const [dataDetailPost, setDataDetailsPost] = useState(null);
  const [openUiUpdatePost, setOpenUiUpdatePost] = useState(false);
  const [showLoadingComment, setShowLoadingComment] = useState(false);
  const [dataUserReply, setDataUserReply] = useState({
    id: "",
    idComment: "",
    username: "",
  });
  const [contentChat, setContentChat] = useState([]);
  const [contentPost, setContentPost] = useState([]);
  const [openUpdateCmt, setOpenUpdateCmt] = useState(false);
  const [contentReplyChat, setContentReplyChat] = useState([]);
  const [dataCommentPost, setDataCommentPost] = useState(null);
  const [openToastDetails, setOpenToastDetails] = useState(false);
  const [valueToastDetails, setValueToastDetails] = useState({
    text: null,
  });
  const [showLoadingGlobal, setShowLoadingGlobal] = useState(false);
  const [openNotFound, setOpenNotFound] = useState(false);

  useEffect(() => {
    const idPost = dataDetailsPost?.id_post;
    isRender &&
      props.getPostRequestByIdPost(
        setShowLoading,
        idPost,
        setShowLoadingComment,
        setOpenNotFound
      );
    setIsRender(false);

    setDataDetailsPost(getDetailPost[0]);
    let arrTemp = [];
    if (getDetailPost[0]?.likes) {
      for (const [key] of Object.entries(getDetailPost[0]?.likes)) {
        if (key === idCookies) {
          arrTemp.push(dataDetailsPost?.id_post);
        }
      }
      setLikePost(_.uniqWith(arrTemp, _.isEqual));
    }

    try {
      const ref = db.ref("/social_network");
      const usersRef = ref.child("users");
      const postsRef = ref.child("posts");

      const getUser = async (id) => {
        let data = {};
        if (id === undefined) return data;
        await usersRef.child(id).once("value", (snap) => {
          if (snap.val() !== null) {
            const { username, imageSrc, name } = snap.val();
            data = { name, username, accountImage: imageSrc };
          }
        });
        return data;
      };

      const fetchDataCommentTest = async (idPost, idKey) => {
        let data = {};
        if (idPost === undefined || idKey === undefined) return data;
        await postsRef
          .child(`${idPost}/comments`)
          .child(idKey)
          .once("value", (snap) => {
            data = { id_comment: snap.key };
          });
        return data;
      };

      const fetchDataComment = async () => {
        let data = {};
        let dataReply = {};
        await postsRef.child(`${idPost}`).on("value", async (snap) => {
          const arrTemp = [];
          const arrReplyTemp = [];
          const arrLikesTemp = [];

          setContentPost(snap.val());

          if (snap.val()?.likes)
            for (const [key] of Object.entries(snap.val()?.likes)) {
              arrLikesTemp.push(key);
            }

          if (snap.val()?.comments)
            for (const [key, value] of Object.entries(snap.val()?.comments)) {
              const testnhaaa = await fetchDataCommentTest(idPost, key);
              let dataUser = await getUser(value?.id_account);
              data = await { ...value, ...dataUser, ...testnhaaa };
              arrTemp.push(data);

              if (data?.reply) {
                for (const [key, value] of Object.entries(data?.reply)) {
                  let dataUserReply = await getUser(value?.id_account);
                  dataReply = await {
                    id_reply: key,
                    ...value,
                    ...dataUserReply,
                    ...testnhaaa,
                  };
                  arrReplyTemp.push(dataReply);
                }
              }
            }
          setContentChat(arrTemp);
          setContentReplyChat(arrReplyTemp);
          setShowLoading(false);
        });
      };

      fetchDataComment();
    } catch (error) {
      console.log(error);
    }
  }, [isRender, dataDetailsPost, idCookies, props, getDetailPost]);

  const onCloseFrom = (e) => {
    props.onCloseForm();
  };

  const onCloseFormNotFound = () => {
    setOpenNotFound(false);
    setOpenDetailsPost(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContentMessage(value);
  };

  const handleReplyComment = (data, idRoomOld) => {
    setDataUserReply({
      id: data?.id_account,
      idComment: idRoomOld ? idRoomOld : data?.id,
      username: data?.username,
    });
  };

  const onCloseFormReply = () => {
    setDataUserReply({
      id: "",
      idComment: "",
      username: "",
    });
  };

  const handleOpenFormUpdate = () => {
    setOpenUiUpdatePost(true);
  };

  const onCloseForm = (e) => {
    setOpenUiUpdatePost(e);
    setOpenUpdateCmt(e);
  };

  const handleSubmit = () => {
    setShowLoadingComment(true);
    dataUserReply.id === ""
      ? props.commentPostRequest(
          //post new comment
          dataDetailsPost?.id_post,
          dataDetailsPost?.id_account,
          idCookies,
          contentMessage,
          [dataDetailsPost?.id_account],
          setShowLoadingComment
        )
      : props.commentReplyPostRequest(
          //reply comment
          dataDetailPost?.id_post,
          dataUserReply?.id,
          dataUserReply?.idComment,
          idCookies,
          `@<a href="/personal/${dataUserReply?.username}">${dataUserReply?.username}</a> ${contentMessage}`,
          [dataUserReply?.id],
          setShowLoadingComment
        );
    setContentMessage("");
    setDataUserReply({
      id: "",
      idComment: "",
      username: "",
    });
  };

  const handleLikePost = () => {
    let removeItem = [];
    removeItem = [...likePost, dataDetailsPost?.id_post];

    if (likePost.includes(dataDetailsPost?.id_post)) {
      removeItem = likePost.filter((e) => e !== dataDetailsPost?.id_post);
    }
    setLikePost(removeItem);
    if (dataDetailsPost) {
      props.likePostRequest(
        dataDetailsPost?.id_post,
        dataDetailsPost?.id_account,
        idCookies,
        typePost
      );
    }
  };

  const openUpdateComment = (content) => {
    setOpenUpdateCmt(true);
    setDataCommentPost(content);
  };

  const handleChoose = (value) => {
    setShowLoadingGlobal(true);
    props.getPersonalByMeRequest(
      setShowLoading,
      value?.username,
      setOpenDetailsPost
    );
  };

  return (
    <div>
      {openUiUpdatePost && (
        <UiUpdatePost
          onCloseForm={onCloseForm}
          dataDetailPost={dataDetailPost}
          setOpenUiUpdatePost={setOpenUiUpdatePost}
          setOpenDetailsPost={setOpenDetailsPost}
          setOpenToast={setOpenToast}
          setValueToast={setValueToast}
        />
      )}
      {openNotFound && <NotFound onCloseFormNotFound={onCloseFormNotFound} />}
      {openUpdateCmt && (
        <UiUpdateComment
          onCloseForm={onCloseForm}
          dataDetailPost={dataDetailPost}
          dataCommentPost={dataCommentPost}
          setOpenUpdateCmt={setOpenUpdateCmt}
          setOpenToastDetails={setOpenToastDetails}
          setValueToastDetails={setValueToastDetails}
        />
      )}
      {showLoadingGlobal && (
        <LinearProgress
          color="#d82b7d"
          duration={1}
          height={3}
          percent={75}
          showValue
          valuePosition="top"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10000 }}
        />
      )}
      <div
        style={{
          width: 150,
          position: "fixed",
          bottom: 70,
          left: 50,
          zIndex: 99,
        }}
      >
        {openToastDetails && (
          <SnackbarContent message={valueToastDetails?.text} />
        )}
      </div>
      <div className="backgroundPost">
        <i
          className="fas fa-times"
          id="iconClosePost"
          onClick={() => onCloseFrom()}
        ></i>
        {showLoading && <CardLoading actionTypes="detailsPost" />}
        {!showLoading && (
          <div className="backgroundPost_form">
            <div className="backgroundPost_form-left">
              <Slide
                autoplay={false}
                style={{ width: "100%", height: "100%" }}
                transitionDuration={300}
                arrows={_.size(dataDetailPost?.imageSrc) === 1 ? false : true}
              >
                {contentPost?.imageSrc?.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt=""
                      id="backgroundPost_form-left"
                    />
                  );
                })}
              </Slide>
            </div>
            <div className="backgroundPost_form-right">
              <div className="form_right-top">
                <div className="right_top-avt">
                  <img
                    src={dataDetailPost?.accountImage}
                    alt=""
                    id="right_top-avt"
                  />
                </div>

                <div className="right_top-title">
                  <Link
                    to={{
                      pathname: `/personal/${dataDetailPost?.username}`,
                    }}
                    onClick={() => handleChoose(dataDetailPost)}
                    id="user_right-a"
                  >
                    {dataDetailPost?.username}
                  </Link>
                </div>
                {dataDetailPost?.id_account === idCookies && (
                  <div className="right_top-function">
                    <i
                      className="fas fa-ellipsis-v"
                      id="right_top-function"
                      onClick={() => handleOpenFormUpdate()}
                    ></i>
                  </div>
                )}
              </div>
              <div
                className={
                  dataUserReply.id !== ""
                    ? "form_right-body-reply"
                    : "form_right-body"
                }
              >
                <div className="right_body-item">
                  <div className="body_item-left">
                    <img
                      src={dataDetailPost?.accountImage}
                      alt=""
                      id="body_item-left"
                    />
                  </div>
                  <div className="body_item-right">
                    <div className="item_right-name">
                      <a href="#" id="right_name-a">
                        <Link
                          to={{
                            pathname: `/personal/${dataDetailPost?.username}`,
                          }}
                          onClick={() => handleChoose(dataDetailPost)}
                          id="user_right-a"
                        >
                          {dataDetailPost?.username}
                        </Link>
                      </a>
                      <p id="right_name-p">{contentPost?.content}</p>
                      <span id="right_name-span">
                        {" "}
                        {TimeStamp(dataDetailPost?.timestamp)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                {contentChat?.map((content, index) => {
                  return (
                    <div className="right_body-comment" key={index}>
                      <div className="body_comment-user">
                        <div className="comment_user-left">
                          <img
                            src={content?.accountImage}
                            alt=""
                            id="user_left-img"
                          />
                        </div>
                        <div className="comment_user-right">
                          <div className="user_right-comment">
                            <div className="right_comment-top">
                              <Link
                                to={{
                                  pathname: `/personal/${content?.username}`,
                                }}
                                onClick={() => handleChoose(content)}
                                id="user_right-a"
                              >
                                {content?.username}
                              </Link>
                              <p id="user_right-p">
                                {ReactHtmlParser(content?.content)}
                              </p>
                            </div>
                            <div className="right_comment-bottom">
                              <p id="comment_bottom-time">
                                {TimeStamp(content?.timestamp)}
                              </p>
                              <span id="comment_bottom-heart">
                                1 lượt thích
                              </span>
                              <span
                                id="comment_bottom-reply"
                                onClick={() =>
                                  handleReplyComment(
                                    content,
                                    content?.id_comment
                                  )
                                }
                              >
                                Trả lời
                              </span>
                            </div>
                          </div>
                          <div className="user_right-heart">
                            {content?.id_account === idCookies && (
                              <i
                                className="fas fa-ellipsis-v"
                                id="right_heart-icon"
                                onClick={() => openUpdateComment(content)}
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>
                      {contentReplyChat && (
                        <div className="reply_comment">
                          <div className="reply_comment-left"></div>
                          <div className="reply_comment-right">
                            {/* <a href="#" id="comment_right-a">
                            ---- Xem câu trả lời
                          </a> */}
                            {contentReplyChat !== undefined &&
                              Object.values(contentReplyChat).map(
                                (item, index) => {
                                  return (
                                    <div key={index}>
                                      {item?.id_comment ===
                                        content?.id_comment && (
                                        <div style={{ marginTop: "15px" }}>
                                          <div className="comment_right-all">
                                            <div className="right_all-left">
                                              <img
                                                src={item?.accountImage}
                                                alt=""
                                                id="all_left-img"
                                              />
                                            </div>
                                            <div className="right_all-right">
                                              <div className="all_right-comment">
                                                <Link
                                                  to={{
                                                    pathname: `/personal/${item?.username}`,
                                                  }}
                                                  onClick={() =>
                                                    handleChoose(item)
                                                  }
                                                  style={{ color: "black" }}
                                                  id="all_right-content"
                                                >
                                                  <b>{item?.username}</b>
                                                </Link>
                                                <br />
                                                {ReactHtmlParser(item?.content)}
                                              </div>
                                              <div className="all_right-heart">
                                                {item?.id_account ===
                                                  idCookies && (
                                                  <i
                                                    className="fas fa-ellipsis-v"
                                                    id="right_heart-icon"
                                                    onClick={() =>
                                                      openUpdateComment(item)
                                                    }
                                                  ></i>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="right_comment-bottom-reply"
                                            style={{ marginLeft: 43 }}
                                          >
                                            <p id="comment_bottom-time">
                                              {" "}
                                              {TimeStamp(item?.timestamp)}
                                            </p>
                                            <span id="comment_bottom-heart">
                                              1 lượt thích
                                            </span>
                                            <span
                                              id="comment_bottom-reply"
                                              onClick={() =>
                                                handleReplyComment(
                                                  item,
                                                  content?.id_comment
                                                )
                                              }
                                            >
                                              Trả lời
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div
                className={
                  dataUserReply.id !== ""
                    ? "form_right-bottom-reply"
                    : "form_right-bottom"
                }
              >
                <div
                  className="right_bottom-top"
                  style={
                    dataUserReply.id !== ""
                      ? { height: "50%" }
                      : { height: " 70%" }
                  }
                >
                  <div className="bottom_top-top">
                    <div className="top_top-itemLeft">
                      <i
                        className="far fa-heart"
                        id="top_top-item"
                        onClick={() => handleLikePost()}
                        style={
                          likePost.includes(dataDetailsPost?.id_post)
                            ? { fontWeight: "bold", color: "rgb(237, 73, 86)" }
                            : null
                        }
                      ></i>
                      <i className="far fa-comment" id="top_top-item"></i>
                      <i className="far fa-paper-plane" id="top_top-item"></i>
                    </div>
                    <div className="top_top-itemRight">
                      <i
                        className="far fa-calendar-check"
                        id="top_top-item"
                      ></i>
                    </div>
                  </div>
                  <div className="bottom_top-body">
                    <p id="top_body-heart">
                      {_.size(dataDetailPost?.likes)} lượt thích
                    </p>
                  </div>
                  <div className="bottom_top-bottom">
                    <p id="top_body-time">
                      {TimeStamp(dataDetailPost?.timestamp)}
                    </p>
                  </div>
                </div>
                {dataUserReply.id !== "" ? (
                  <div className="bottom_bottom-showUser">
                    <i
                      className="fas fa-times"
                      id="bottom_showUser-close"
                      onClick={() => onCloseFormReply()}
                    ></i>
                    Đang trả lời: <b>{dataUserReply?.username}</b>
                  </div>
                ) : (
                  <div></div>
                )}

                <div
                  className="right_bottom-bottom"
                  style={dataUserReply ? { height: "25%" } : { height: "30%" }}
                >
                  <div className="bottom_bottom-left">
                    {showLoadingComment && (
                      <CircularProgress
                        color="#f26e41"
                        direction="bottom"
                        percent={100}
                        percentColor="#0095ff"
                        size="extraSmall"
                        strokeWidth={10}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          fontSize: 10,
                          zIndex: 10000,
                        }}
                      />
                    )}
                    <textarea
                      name=""
                      cols="30"
                      rows="10"
                      id="bottom_left-input"
                      placeholder="Nhập bình luận..."
                      onChange={(e) => handleChange(e)}
                      value={contentMessage}
                    ></textarea>
                  </div>
                  <div
                    className="bottom_bottom-right"
                    onClick={() => handleSubmit()}
                  >
                    Đăng
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getDetailPost: state.DetailsPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequestByIdPost: (
      setShowLoading,
      idPost,
      setShowLoadingComment,
      setOpenNotFound
    ) => {
      dispatch(
        actions.getPostRequestByIdPost(
          setShowLoading,
          idPost,
          setShowLoadingComment,
          setOpenNotFound
        )
      );
    },
    likePostRequest: (idPost, idOwner, idCookies, typePost) => {
      dispatch(actions.likePostRequest(idPost, idOwner, idCookies, typePost));
    },
    getPersonalByMeRequest: (
      setShowLoading,
      username,
      setOpenContentFollow
    ) => {
      dispatch(
        actions.getPersonalByMeRequest(
          setShowLoading,
          username,
          setOpenContentFollow
        )
      );
    },
    commentPostRequest: (
      idPost,
      idOwner,
      idAccount,
      content,
      mentionList,
      setShowLoadingComment
    ) => {
      dispatch(
        actions.commentPostRequest(
          idPost,
          idOwner,
          idAccount,
          content,
          mentionList,
          setShowLoadingComment
        )
      );
    },
    commentReplyPostRequest: (
      idPost,
      idOwner,
      idComment,
      idAccount,
      content,
      mentionList,
      setShowLoadingComment
    ) => {
      dispatch(
        actions.commentReplyPostRequest(
          idPost,
          idOwner,
          idComment,
          idAccount,
          content,
          mentionList,
          setShowLoadingComment
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost);
