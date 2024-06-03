/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./post.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import TimeStamp from "../../timeStamp";
import { Slide } from "react-slideshow-image";
import ReactHtmlParser from "react-html-parser";
import * as actions from "../../redux/actions/Index";
import DetailsPost from "../detailsPost/DetailsPost";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CardLoading from "../animation/cardLoading/CardLoading";
import { LinearProgress, CircularProgress } from "diginet-core-ui/components";

function Post(props) {
  const { dataPost, dataLoadmore } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [idPost, setIdPost] = useState("");
  const [content, setContent] = useState("");
  const [likePost, setLikePost] = useState([]);
  const [isRender, setIsRender] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [dataNewsPost, setDataNewsPost] = useState(null);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [openDetailsPost, setOpenDetailsPost] = useState(false);
  const [showLoadingComment, setShowLoadingComment] = useState(false);
  const [showLoadingLoadmore, setShowLoadingLoadmore] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [valueToast, setValueToast] = useState({ text: null });

  useEffect(() => {
    let arrTest = [];
    let arrTemp = [];
    if (idCookies) isRender && props.getPostRequest(setShowLoading, idCookies);
    setIsRender(false);
    arrTest = dataPost;
    setDataNewsPost(arrTest);
    dataPost?.forEach((item) => {
      if (item?.likes) {
        for (const [key] of Object.entries(item.likes)) {
          if (key === idCookies) {
            arrTemp.push(item?.id_post);
          }
        }
      }
    });
    setLikePost(_.uniqWith(arrTemp, _.isEqual));
    if (!_.isEmpty(dataLoadmore)) {
      const concatArr = arrTest.concat(dataLoadmore);
      setDataNewsPost(concatArr);
    } else {
    }
  }, [props, idCookies, isRender, dataPost?.id_account, dataPost, idPost]);

  const handleClickChoosePost = (data) => {
    setDataDetailsPost(data);
    setOpenDetailsPost(true);
  };

  const onCloseForm = (e) => {
    setOpenDetailsPost(e);
  };

  const handleChange = (e, idPost) => {
    setIdPost(idPost);
    const value = e.target.value;
    setContent(value);
  };

  const handleSubmit = (item) => {
    if (content !== "") {
      setShowLoadingComment(true);
      props.commentPostRequest(
        item?.id_post,
        item?.id_account,
        idCookies,
        content,
        [item?.id_account],
        setShowLoadingComment
      );
      setContent("");
    }
  };

  const handleLikePost = (idPost, idOwner) => {
    let removeItem = [];
    removeItem = [...likePost, idPost];

    if (likePost.includes(idPost)) {
      removeItem = likePost.filter((e) => e !== idPost);
    }
    setLikePost(removeItem);
    props.likePostRequest(idPost, idOwner, idCookies, setShowLoadingComment);
  };

  const handleLoadmore = () => {
    setShowLoadingLoadmore(true);
    const dataLoadmore = _.orderBy(dataNewsPost, "timestamp", "asc").shift();
    props.getLoadmorePostRequest(
      dataLoadmore?.id_account,
      dataLoadmore?.timestamp,
      setShowLoadingLoadmore,
      setValueToast,
      setOpenToast
    );
  };

  return (
    <div>
      {openDetailsPost && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
          typePost="allPost"
          setOpenDetailsPost={setOpenDetailsPost}
        />
      )}
      {showLoading && (
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
      {/* {showLoading && <GlobalLoading />} */}

      <div
        style={{
          width: 150,
          position: "fixed",
          bottom: 70,
          left: 50,
          zIndex: 9999,
        }}
      >
        {openToast && <SnackbarContent message={valueToast?.text} />}
      </div>
      {showLoading && <CardLoading actionTypes="post" />}

      <div id="scrollableDiv" className="backgroundItem">
        {!showLoading &&
          (_.isEmpty(dataNewsPost) ? (
            <h3>Hiện chưa có bài viết nào!!!</h3>
          ) : (
            _.orderBy(dataNewsPost, "timestamp", "desc")?.map((item, index) => {
              return (
                <div key={index} className="backgroundItem_form">
                  <div className="backgroundItem_form-top">
                    <div className="formItem_top-left">
                      <Link
                        to={{
                          pathname: `/personal/${item?.username}`,
                          state: item,
                        }}
                      >
                        <img
                          src={item?.accountImage}
                          id="formItem_top-left"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="formItem_top-body">
                      <Link
                        to={{
                          pathname: `/personal/${item?.username}`,
                          state: item,
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {item?.username}
                      </Link>
                    </div>
                    <div className="formItem_top-right">
                      <i
                        className="fas fa-ellipsis-h"
                        id="formItem_top-right"
                      ></i>
                    </div>
                  </div>
                  <div className="backgroundItem_form-body">
                    <Slide
                      autoplay={false}
                      style={{ width: "100%", height: "100%" }}
                      transitionDuration={300}
                      arrows={item?.imageSrc?.length === 1 ? false : true}
                    >
                      {!_.isEmpty(item?.imageSrc) &&
                        item?.imageSrc?.map((image, index) => {
                          return (
                            <img
                              key={index}
                              src={image}
                              id="backgroundItem_form-body"
                              alt=""
                            />
                          );
                        })}
                    </Slide>
                  </div>
                  <div className="backgroundItem_form-bottom">
                    <div className="formItem_bottom-top">
                      <div className="bottomItem_top-top">
                        <i
                          className="far fa-heart"
                          id="topItem_top-left"
                          onClick={() =>
                            handleLikePost(item?.id_post, item?.id_account)
                          }
                          style={
                            likePost.includes(item.id_post)
                              ? {
                                  fontWeight: "bold",
                                  color: "rgb(237, 73, 86)",
                                }
                              : null
                          }
                        ></i>
                        <i className="far fa-comment" id="topItem_top-left"></i>
                        <i
                          className="far fa-paper-plane"
                          id="topItem_top-left"
                        ></i>
                      </div>
                      {_.size(item?.likes) !== 0 && (
                        <div
                          className="topItem_bottom-bottom"
                          style={{ marginBottom: -5 }}
                        >
                          <b>{_.size(item?.likes)} lượt thích</b>
                        </div>
                      )}

                      <div className="bottomItem_top-body">
                        <p id="bottomItem_top-body">
                          <b>{item?.username}</b>
                          {ReactHtmlParser(item?.content)}
                        </p>
                      </div>
                      <div className="bottomItem_top-bottom">
                        {item?.comments.length !== 0 && (
                          <div
                            className="topItem_bottom-top"
                            onClick={() => handleClickChoosePost(item)}
                          >
                            Xem tất cả {item?.comments} bình luận
                          </div>
                        )}
                        <div className="topItem_bottom-bottom">
                          <p id="topItem_bottom-bottom">
                            {TimeStamp(item?.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="formItem_bottom-bottom">
                      <div className="bottomItem_bottom-left">
                        {idPost === item?.id_post
                          ? showLoadingComment && (
                              <CircularProgress
                                color="#f26e41"
                                direction="bottom"
                                percent={100}
                                percentColor="#0095ff"
                                size="extraSmall"
                                strokeWidth={10}
                                style={{
                                  position: "absolute",
                                  top: 15,
                                  right: 28,
                                  fontSize: 10,
                                  zIndex: 10000,
                                }}
                              />
                            )
                          : null}
                        <textarea
                          name="comment"
                          id="bottomItem_bottom-left"
                          placeholder="Nhập bình luận..."
                          onChange={(e) => handleChange(e, item?.id_post)}
                          value={idPost === item?.id_post ? content : ""}
                        />
                      </div>
                      <div
                        className="bottomItem_bottom-right"
                        style={
                          idPost === item?.id_post
                            ? content === ""
                              ? { color: "#a7dafb" }
                              : { color: "rgba(var(--d69,0,149,246),1)" }
                            : { color: "#a7dafb" }
                        }
                        onClick={
                          idPost === item?.id_post
                            ? () => handleSubmit(item)
                            : null
                        }
                      >
                        Đăng
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ))}
        {!showLoading && !_.isEmpty(dataPost) && (
          <div className="loadmore" onClick={() => handleLoadmore()}>
            Xem thêm <i className="fas fa-chevron-down" id="loadmoreIcon"></i>{" "}
            {showLoadingLoadmore && (
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
                  right: "35%",
                  fontSize: 10,
                  zIndex: 10000,
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    dataPost: state.Post,
    dataLoadmore: state.Loadmore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequest: (setShowLoading, id) => {
      dispatch(actions.getPostRequest(setShowLoading, id));
    },
    getLoadmorePostRequest: (
      idUser,
      timestamp,
      setShowLoadingLoadmore,
      setValueToast,
      setOpenToast
    ) => {
      dispatch(
        actions.getLoadmorePostRequest(
          idUser,
          timestamp,
          setShowLoadingLoadmore,
          setValueToast,
          setOpenToast
        )
      );
    },
    likePostRequest: (idPost, idOwner, idCookies, setShowLoadingComment) => {
      dispatch(
        actions.likePostRequest(
          idPost,
          idOwner,
          idCookies,
          setShowLoadingComment
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
