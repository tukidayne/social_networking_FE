import React, { useState, useEffect } from "react";
import "./uiGroupChat.css";
import _ from "lodash";
import { db } from "../../services/firebase";

function UiGroupChat(props) {
  const { openGroupChat, dataUser } = props;
  const [arrItemChoose, setArrItemChoose] = useState([]);
  const [arrDataItemChoose, setArrDataItemChoose] = useState([]);
  
  useEffect(() => {
    !_.isEmpty(arrDataItemChoose) &&
      arrDataItemChoose.length === 1 &&
      props.arrDataItemChoose({
        id: arrDataItemChoose[0].id_account,
        name: arrDataItemChoose[0].name,
        username: arrDataItemChoose[0].username,
        imageSrc: arrDataItemChoose[0].imageSrc,
      });
  }, [arrDataItemChoose, props]);

  const onCloseForm = () => {
    props.onCloseForm();
  };

  const handleChooseItem = (item) => {
    let removeItem = [];
    removeItem = [...arrItemChoose, item.id_account];

    if (arrItemChoose.includes(item.id_account)) {
      removeItem = arrItemChoose.filter((e) => e !== item.id_account);
    }
    setArrItemChoose(removeItem);
  };

  const onCreateChat = async () => {
    let arrDateChooseTemp = [];
    dataUser?.following.forEach((e) => {
      if (arrItemChoose.length === 1) {
        if (e.id_account === arrItemChoose[0]) {
          arrDateChooseTemp.push(e);
        }
      } else {
        arrItemChoose.forEach((item) => {
          if (item === e.id_account) {
            arrDateChooseTemp.push(e);
          }
        });
      }
    });
    setArrDataItemChoose(arrDateChooseTemp);
    props.onCloseForm();

    let objectTemp1 = {};
    let objectTemp2 = {};
    let objectTempUsername = [];

    arrDateChooseTemp.forEach((e) => {
      objectTemp1 = {
        name: e.name,
        id: e.id_account,
        username: e.username,
        imageSrc: e.imageSrc,
      };
      objectTemp2[objectTemp1.id] = objectTemp1;
      objectTempUsername.push(e.username);
    });
    objectTemp2[dataUser.id] = {
      name: dataUser.name,
      id: dataUser.id,
      username: dataUser.username,
      imageSrc: dataUser.imageSrc,
    };
    objectTempUsername.push(dataUser.username);

    const getKey = (await db.ref("chat_info").push()).getKey();
    await db.ref(`chat_info/${getKey}`).set({
      containId: objectTemp2,
      idRoom: getKey,
      imageSrc:
        "https://images.vexels.com/media/users/3/132363/isolated/preview/a31cc22b4b43c6dacdf885948f886f7c-support-blue-circle-icon-by-vexels.png",
      username: objectTempUsername.toString(),
      name: "Nhắn tin trò chuyện cùng bạn bè nhé",
      lastTime: Date.now(),
    });

    await db.ref(`chat_messages/${getKey}`).push({
      content: "",
      idUser: dataUser?.id,
      name: dataUser?.name,
      username: dataUser?.username,
      time: Date.now(),
    });
  };

  return (
    <div style={openGroupChat ? { display: "block" } : { display: "none" }}>
      <div className="backgroundGroupChat">
        <div className="backgroundGroupChat_form">
          <div className="backgroundGroupChat_form-top">
            <div
              className="formGroupChat_top-left"
              onClick={() => onCloseForm()}
            >
              <i className="fas fa-times"></i>
            </div>
            <div className="formGroupChat_top-body">Tin nhắn mới</div>
            <div
              className="formGroupChat_top-right"
              onClick={
                _.isEmpty(arrItemChoose) || _.size(arrItemChoose) === 1
                  ? null
                  : () => onCreateChat()
              }
              style={
                _.isEmpty(arrItemChoose) || _.size(arrItemChoose) === 1
                  ? { color: "#b7e1fd" }
                  : { color: "#1ea1f7" }
              }
            >
              Tiếp
            </div>
          </div>
          <div className="backgroundGroupChat_form-bottom">
            <div className="formGroupChat_wrapper">
              {/* ----------------------------------- item ----------------------------------- */}

              {dataUser?.following?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="formGroupChat_bottom-item"
                    onClick={() => handleChooseItem(item)}
                  >
                    <div className="bottomGroupChat_item-left">
                      <img
                        src={item.imageSrc}
                        alt=""
                        id="bottomGroupChat_item-img"
                      />
                    </div>
                    <div className="bottomGroupChat_item-body">
                      <div className="itemGroupChat_body-top">
                        {item.username}
                      </div>
                      <div className="itemGroupChat_body-bottom">
                        {item.name}
                      </div>
                    </div>
                    <div className="bottomGroupChat_item-right">
                      <i
                        className="fas fa-check-circle"
                        id="bottomGroupChat_item-icon"
                        style={{
                          fontWeight: arrItemChoose.includes(item.id_account)
                            ? "bold"
                            : "300",
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
              {/* ----------------------------------- end item ----------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UiGroupChat;
