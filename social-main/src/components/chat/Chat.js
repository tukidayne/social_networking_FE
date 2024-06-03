import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import _ from "lodash";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import TimeStamp from "../../timeStamp";
import { db } from "../../services/firebase";
import UiEditChat from "../uiEditChat/UiEditChat";
import ScrollToBottom from "react-scroll-to-bottom";
import * as actions from "../../redux/actions/Index";
import UiGroupChat from "../uiGroupChat/UiGroupChat";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import FaceTime from "../faceTime/FaceTime";
import { LinearProgress } from "diginet-core-ui/components";

let arrImg = [];

function Chat(props) {
  const { history, personalRequest, dataUser, dataUserApi } = props;
  const arrTemp = useRef([]);
  const cookies = new Cookies();
  const [chat, setChat] = useState([]);
  const idUser = cookies.get("user");
  const [roomId, setRoomId] = useState("");
  const username = cookies.get("username");
  const [content, setContent] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [imgChoose, setImgChoose] = useState(null);
  const [dataFriend, setDataFriend] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [colorChoose, setColorChoose] = useState(null);
  const [arrContainId, setArrContainId] = useState([]);
  const [dataHistory, setDataHistory] = useState(null);
  const [colorHistory, setColorHistory] = useState(null);
  const [openGroupChat, setOpenGroupChat] = useState(false);
  const [dataUserChoose, setDataUserChoose] = useState(null);
  const [isOpenEditChat, setIsOpenEditChat] = useState(false);
  const arrFriendNews = useRef([]);
  const [dataCall, setDataCall] = useState(null);
  const [openFaceTime, setOpenFaceTime] = useState(false);

  useEffect(() => {
    let roomIdTemp = "";

    //------------------------- PUSH DATA FROM HISTORY -------------------------

    const stateHistory = history?.location?.state;
    if (stateHistory !== undefined) {
      dataHistory !== "" && setDataHistory(stateHistory);
      colorHistory !== "" && setColorHistory(stateHistory.id);
      dataHistory && setDataUserChoose(dataHistory);
      colorHistory && setColorChoose(colorHistory);
    }

    //------------------------- END PUSH DATA FROM HISTORY -------------------------

    //------------------------- CREATE CONTENTID -------------------------

    let objectTemp1 = {
      name: dataUser?.name,
      imageSrc: dataUser?.imageSrc,
      id: dataUser?.id,
      username: dataUser?.username,
    };
    let objectTemp2 = {
      name: dataUserChoose?.name,
      imageSrc: dataUserChoose?.imageSrc,
      id: dataUserChoose?.id,
      username: dataUserChoose?.username,
    };
    let objectTemp3 = {};
    objectTemp3[idUser] = objectTemp1;
    objectTemp3[dataUserChoose?.id] = objectTemp2;
    setArrContainId(objectTemp3);

    //------------------------- END CREATE CONTENTID -------------------------

    const arrConcat = arrTemp?.current.concat(stateHistory);
    stateHistory ? setDataFriend(arrConcat) : setDataFriend(arrTemp?.current);

    try {
      isRender && props.getPersonalByIdOfMeRequest(idUser, setShowLoading);
      setIsRender(false);

      const getDataChatRequest = async () => {
        let data = {};
        let arrTemp = [];
        await db
          .ref()
          .child("chat_info")
          .orderByChild(`containId/${idUser}/id`)
          .equalTo(idUser)
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              for (const [key, value] of Object.entries(snapshot.val())) {
                if (_.size(value?.containId) === 2) {
                  for (const [keyId, valueId] of Object.entries(
                    value?.containId
                  )) {
                    if (valueId?.id !== idUser) {
                      data = {
                        ...valueId,
                        idRoom: key,
                        lastTime: value?.lastTime,
                      };
                      arrTemp.push(data);

                      //check xem co stateHistory hay khong
                      if (stateHistory !== undefined) {
                        if (stateHistory?.id !== valueId?.id) {
                          arrTemp.push(stateHistory);
                        }
                      }

                      if (dataUserChoose !== null) {
                        if (dataUserChoose?.id === valueId?.id) {
                          roomIdTemp = value.idRoom;
                          setRoomId(roomIdTemp);
                        }
                      }
                    }

                    setDataFriend(
                      _.uniqWith(
                        _.sortBy(arrTemp, ["lastTime"], ["desc"]),
                        _.isEqual
                      )
                    );
                  }
                } else {
                  arrTemp.push(value);
                  setDataFriend(_.uniqWith(arrTemp, _.isEqual));
                  if (dataUserChoose !== null) {
                    if (dataUserChoose.idRoom === value.idRoom) {
                      roomIdTemp = value.idRoom;
                      setRoomId(roomIdTemp);
                    }
                  }
                }
              }
            }

            if (roomIdTemp !== "") {
              db.ref("chat_messages/" + roomIdTemp).on("value", (snapshot) => {
                const chatTemp = [];
                if (snapshot.val() !== null)
                  for (const [key, value] of Object.entries(snapshot.val())) {
                    chatTemp.push(value);
                  }
                setChat(chatTemp);
              });
            } else {
              setChat([]);
              setRoomId("");
            }
          });
      };

      getDataChatRequest();
    } catch (error) {
      console.log(error);
    }
  }, [
    colorHistory,
    dataHistory,
    dataUserChoose,
    history?.location?.state,
    idUser,
    isRender,
    personalRequest,
    username,
    dataUser?.id,
    dataUser?.imageSrc,
    dataUser?.name,
    dataUser?.username,
    arrFriendNews,
    dataUserApi?.dataAllUser,
    history,
    props,
  ]);

  const handleChangeImg = (e) => {
    console.log(e.target.files);
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

  //CLOUDINARY_URL=cloudinary://484567344742993:f3eBrbcBAeKyFrk131936YDuS74@baby-dont-cry

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
        arrImg.push(response.url);
        setShowLoading(false);
        setImgChoose(arrImg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      content !== "" && handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (roomId !== "") {
        // update message
        content !== "" &&
          (await db.ref(`chat_messages/${roomId}`).push({
            content: content,
            idUser: dataUser?.id,
            name: dataUser?.name,
            image: imgChoose,
            username: dataUser?.username,
            imageSender: dataUser?.imageSrc,
            time: Date.now(),
          }));
        content !== "" &&
          (await db.ref(`chat_info/${roomId}/lastTime`).set(Date.now()));
      } else {
        // new message
        const getKey =
          content !== "" && (await db.ref("chat_info").push()).getKey();
        content !== "" &&
          (await db.ref(`chat_info/${getKey}`).set({
            containId: arrContainId,
            idRoom: getKey,
            imageSrc: "",
            name: "",
            username: "",
            lastTime: Date.now(),
          }));

        content !== "" &&
          (await db.ref(`chat_messages/${getKey}`).push({
            content: content,
            idUser: dataUser?.id,
            name: dataUser?.name,
            username: dataUser?.username,
            image: imgChoose,
            imageSender: dataUser?.imageSrc,
            time: Date.now(),
          }));
      }
      if (content !== "") {
        setContent("");
        setImgChoose(null);
        arrImg = [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUser = (item) => {
    setDataUserChoose(item);
    setColorChoose(item.idRoom);
    setDataHistory("");
    setColorHistory("");
  };

  const onCloseShowImg = () => {
    setImgChoose(null);
    arrImg = [];
  };

  const onOpenCreateChat = () => {
    setOpenGroupChat(true);
  };

  const onCloseForm = (e) => {
    setOpenGroupChat(e);
    setIsOpenEditChat(e);
  };

  const handleEditChat = () => {
    setIsOpenEditChat(true);
  };

  const arrDataItemChoose = async (e) => {
    console.log(e);
  };

  const handleOpenFacetime = (data) => {
    setDataCall(data);
    setOpenFaceTime(true);
  };

  const handleRemoveImage = (image) => {
    let arrImgClone = [...imgChoose];
    const results = arrImgClone.findIndex((img) => img === image);
    arrImgClone.splice(results, 1);
    setImgChoose(arrImgClone);
  };

  return (
    <div>
      {openFaceTime && <FaceTime dataCall={dataCall} />}
      {/* {showLoading && <GlobalLoading />} */}
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
      <UiGroupChat
        openGroupChat={openGroupChat}
        onCloseForm={onCloseForm}
        arrDataItemChoose={arrDataItemChoose}
        dataUser={dataUser}
      />
      <UiEditChat isOpenEditChat={isOpenEditChat} onCloseForm={onCloseForm} />
      <div className="contentChat">
        <div className="container-contentChat">
          <div className="contentChat-left">
            <div className="contentChat-top-left">
              <div className="contentChat-top-name">
                <p id="p-contentChat-top-name">{username}</p>
              </div>
              <i
                className="far fa-comments"
                id="iconcontentChatTopLeft"
                onClick={() => onOpenCreateChat()}
              ></i>
            </div>
            <div className="contentChat-bottom-left">
              {_.orderBy(
                _.uniqBy(dataFriend, "idRoom")?.filter(
                  (item) => item?.idRoom !== undefined
                ),
                ["lastTime"],
                ["desc"]
              )?.map((item, index) => {
                return (
                  <div
                    className="item-leftChat"
                    key={index}
                    onClick={() => handleClickUser(item)}
                    style={
                      colorChoose === item?.idRoom
                        ? { backgroundColor: "#efefef" }
                        : null
                    }
                  >
                    <div className="item-leftChat-left">
                      <img src={item?.imageSrc} alt="" id="img-chat" />
                    </div>
                    <div className="item-leftChat-right">
                      <div className="p-item-leftChat-right">
                        <p id="p-item-leftChat-right">{item?.username}</p>
                      </div>
                      <span id="span-item-leftChat-right">{item?.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------- CONTENT RIGHT -----------------------------------------  */}

          {(dataUserChoose && dataFriend.length !== 0) ||
          (dataHistory && dataFriend.length !== 0) ? (
            <div className="contentChat-right">
              <div className="contentChat_right-top">
                <div className="rightChat_top-left">
                  <div className="topChat_left-avt">
                    <img
                      src={dataUserChoose?.imageSrc}
                      id="topChat_left-avt"
                      alt=""
                    />
                  </div>
                  <div className="topChat_left-name">
                    <div className="leftChat_name-top">
                      {dataUserChoose?.username}
                    </div>
                    <div className="leftChat_name-bottom">
                      {dataUserChoose?.name}
                    </div>
                  </div>
                </div>
                <div className="rightChat_top-right">
                  <i
                    className="fas fa-video"
                    id="rightChat_top-right"
                    style={{ marginRight: 10 }}
                    onClick={() => handleOpenFacetime(dataUserChoose)}
                  ></i>
                  <i
                    className="fas fa-info-circle"
                    id="rightChat_top-right"
                    onClick={() => handleEditChat()}
                  ></i>
                </div>
              </div>
              <div className="contentChat_right-bottom">
                <ScrollToBottom
                  className={
                    imgChoose
                      ? "rightChat_bottom-showImgChoose"
                      : "rightChat_bottom-top"
                  }
                >
                  {chat?.map((item, index) => {
                    return (
                      <div key={index}>
                        {item?.idUser !== idUser && item?.content !== "" && (
                          <div className="content-message-left">
                            <div className="content-wrapper">
                              <div className="avt-content">
                                <img
                                  src={item?.imageSender}
                                  id="avt-content"
                                  alt=""
                                />
                              </div>
                              <div className="content-wrapperLeft">
                                <div className="username-content">
                                  {item?.name} - {TimeStamp(item?.time)}
                                </div>
                                <div className="p-content">{item?.content}</div>
                              </div>
                            </div>

                            {item?.image?.map((value, index) => {
                              return (
                                <div className="img_content-left" key={index}>
                                  <div className="avt-content">
                                    <img
                                      src={item?.imageSender}
                                      id="avt-content"
                                      alt=""
                                    />
                                  </div>
                                  <div className="image_Content-wrapper">
                                    <div className="username-content">
                                      {item?.name}
                                    </div>
                                    <div className="img_content_left">
                                      <img
                                        src={value}
                                        alt=""
                                        id="img_content-left"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {item?.idUser === idUser && item?.content !== "" && (
                          <div>
                            <div className="wrapper_content">
                              <div className="p-content">{item?.content}</div>
                            </div>
                            {item?.image?.map((value, index) => {
                              return (
                                <div key={index} className="img_content-right">
                                  <img
                                    src={value}
                                    alt=""
                                    id="img_content-right"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </ScrollToBottom>
                <div
                  className={imgChoose ? "showImgChoose" : "hiddenImgChoose"}
                >
                  <div className="showImgChoose_wrapper-close">
                    <i
                      className="fas fa-times"
                      id="wrapper_close"
                      onClick={() => onCloseShowImg()}
                    ></i>
                  </div>
                  <div className="showImgChoose_wrapper">
                    {imgChoose?.map((item, index) => {
                      return (
                        <div className="showImgChoose_img" key={index}>
                          <img src={item} id="showImgChoose_img" alt="" />
                          <i
                            className="fas fa-times"
                            id="icon_imageChoose"
                            onClick={() => handleRemoveImage(item)}
                          ></i>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rightChat_bottom-bottom">
                  <form onSubmit={handleSubmit}>
                    <div className="bottomChat_bottom-wrap">
                      <div className="bottomChat_wrap-left">
                        <i
                          className="far fa-smile"
                          id="bottomChat_wrap-left"
                        ></i>
                      </div>
                      <div className="bottomChat_wrap-body">
                        <textarea
                          name=""
                          id="textarea-chat"
                          placeholder="Nhắn tin...."
                          onChange={(e) => handleChange(e)}
                          value={content}
                          onKeyDown={onEnterPress}
                        ></textarea>
                      </div>
                      <div className="bottomChat_wrap-right">
                        <label className="lblImageChat">
                          <input
                            type="file"
                            style={{ opacity: 0 }}
                            multiple
                            onChange={handleChangeImg}
                          />
                          <i className="fas fa-images" id="icon-chat-right"></i>
                        </label>

                        <button type="submit" id="btn_submitChat">
                          <i
                            className="fas fa-paper-plane"
                            id="icon-chat-right"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="contentChat-right">
              <div className="contentChat_right-item">
                <i className="far fa-paper-plane"></i>
                Tin nhắn của bạn
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.PersonalOfMe,
    dataUserApi: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalByIdOfMeRequest: (id, setShowLoading) => {
      dispatch(actions.getPersonalByIdOfMeRequest(id, setShowLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
